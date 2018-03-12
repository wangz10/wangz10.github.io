// Util functions
function mergeSumObjs(obj1, obj2){
	// Merge two objs and sum the values for shared keys
	for (var key in obj2) { 
		if (_.has(obj1, key)){
			obj1[key] += obj2[key];
		} else {
			obj1[key] = obj2[key];
		}
	}
	return obj1;
}

// The Model for Publication
var Publication = Backbone.Model.extend({
	defaults: {
		title: '',
		doi: '',
		authors: [],
		journal: '',
	},
	parse: function(obj){
		parsedObj = {};
		parsedObj.title = obj.titles.title;
		parsedObj.doi = obj.doi.replace('https://doi.org/', '');
		parsedObj.authors = _.map(obj.contributors, function(name){
			var firstName = name.split(', ')[1],
				lastName = name.split(', ')[0]; 
			return firstName + ' ' + lastName;
		});
		parsedObj.abstract = obj.abstract;

		// I am the n-th author
		var myRank = parsedObj.authors.indexOf('Zichen Wang') + 1;
		if (myRank === 0){
			myRank = parsedObj.authors.indexOf('Zi-Chen Wang') + 1;
		}
		parsedObj.myRank = myRank;

		parsedObj.journal = obj.titles['secondary-title'];
		if (typeof(obj.dates) === 'object'){
			parsedObj.year = parseInt(obj.dates.year);
		} else {
			parsedObj.year = parseInt(obj.dates);
		}
		return parsedObj; 
	},

});


// View for Publication Model
var PubView = Backbone.View.extend({
	model: Publication,
	tagName: 'li',

	template: _.template($('#pubTemplate').html()),

	initialize: function(){
		this.render();
	},
	render: function(){
		this.$el.html( this.template(this.model.toJSON()));
		this.$el.fadeIn();
		return this;
	},

});


// Collection of Publication Models
var Publications = Backbone.Collection.extend({
	model: Publication,
	url: 'assets/publications.json',
	// options for WordFreq
	wordfreqOptions: { 
		languages: 'english',
		minimumCount: 0
	},


	initialize: function(){
		// which key to sort the models by
		this.sortKey = 'year';

		// load stopWords
		var self = this;
		$.getJSON('assets/stopwords.json', function(stopWords){
			self.wordfreqOptions.stopWords = stopWords;
		})
		// count tokens when fetch is called
		this.listenTo(this, 'sync', this.countTokens)
	},
	
	comparator: function(model){
		if (this.sortKey === 'year') {
			// sort in descending order for year
			return -model.get(this.sortKey)
		} else{
			// ascending order for other
			return model.get(this.sortKey);	
		};
	},

	sortByKey: function(key){
		// sort collections by key
		this.sortKey = key;
		this.sort();
		this.trigger('sortedBy', {'key': key});
	},

	countTokens: function(){
		// use WordFreq to tokenize and count frequencies of tokens 
		// weight by myRank. 
		// init a WordFreq instance
		this.wordfreq = WordFreqSync(this.wordfreqOptions)
		// count tokens and weight by the inverse of myRank
		combinedObj = {}
		var self = this;
		this.each(function(model){
			var texts = [model.get('title'), model.get('abstract')].join(' ');
			var weight = 1/model.get('myRank');
			var list = self.wordfreq.process(texts)
			// multiply weight
			list = _.map(list, function(item){ return [item[0], item[1]*weight]; })
			// convert to object: {'w0': 1, 'w1': 2}
			list = _.object(list);
			combinedObj = mergeSumObjs(combinedObj, list)
		});
		// convert back to [['w0', 1], ['w2', 2]] format
		this.list = _.pairs(combinedObj);
		this.trigger('tokensCountGot');
	},

	countTokensUniform: function(){
		// use WordFreq to tokenize and count frequencies of tokens without 
		// applying any weights.
		// @ref: https://github.com/timdream/wordfreq
		// init a WordFreq instance
		this.wordfreq = WordFreqSync(this.wordfreqOptions)
		// a string collecting all texts in abstract field of the models
		this.allAbstracts = this.pluck('abstract').join(' ');
		this.allTitles = this.pluck('title').join(' ');
		// a string of all texts
		this.corpus = [this.allAbstracts, this.allTitles].join(' ');

		this.list = this.wordfreq.process(this.corpus);
		this.trigger('tokensCountGot');
	},

});


// View for Collection of Publications
var PubsView = Backbone.View.extend({
	tagName: 'ol',
	initialize: function(){
		this.listenTo(this.collection, 'sync', this.render)
		
		// Fetch the default set of models for this collection from the url
		this.collection.fetch();
		// render again when its collection is sorted
		this.listenTo(this.collection, 'sortedBy', this.render);
	},

	render: function(){
		// empty previously loaded DOMs on $el
		this.$el.empty();
		this.collection.each(function(pub){
			var pubView = new PubView({model: pub});

			this.$el.append(pubView.el);
		}, this);
		return this; // returning this for chaining..
	},

});


var PubsWordCloudView = Backbone.View.extend({
	// WordCloud view of Publications
	tagName: 'div',
	defaults: {
		weightFactor: 0.5,
		canvasId: 'wc',
	},

	initialize: function(options){
		//initialize with defaults and passed arguments.
		_.defaults(options,this.defaults);
		_.defaults(this,options);
		//override view's el property
		this.selector = "#" + this.canvasId;
		this.$el = $(this.selector)
		// don't need to fetch because collection was fetched in PubsView
		// this.collection.fetch()

		var self = this;

		// options for WordCloud
		this.wcOptions = {
			weightFactor: this.weightFactor,
			minSize: 4,

			// interactive callbacks are only for canvas element
			hover: function(item, dimension, event){
				console.log(item)
			},
			click: function(item, dimension, event){
				console.log(item)
				// self.trigger('wordClicked', self.tokenMap[item[0]])
			},
			classes: 'token'
		};

		// listen to collection then render
		this.listenTo(this.collection, 'tokensCountGot', this.render)
	},



	render: function(){ // called after the view init
		var list = this.collection.list;

		this.wcOptions.list = list;

		var self = this;
		// a hacky way to get around the "bug" in wordcloud2
		var w = $("#wordcloud").width(),
			h = w * 1.618;

		var canvas = $('<canvas>').attr('width', w+'px').attr('height', h+'px');

		this.$el.on('wordcloudstart', function(e){
			console.log('wordcloudstart')
		})

		this.$el.on('wordcloudstop', function(e){
			console.log('wordcloudstop')
			texts = d3.selectAll('.token')
				.on('click', function(){
					var token = d3.select(this).text();
					// var nodeIndices = self.tokenMap[token];
					// self.trigger('wordClicked', nodeIndices);
					console.log(token)
					self.trigger('wordClicked', token);
				});
			self.texts = texts;
		})
		console.log(self.wcOptions.list.length)

		WordCloud([canvas[0], this.$el[0]], this.wcOptions)
		// WordCloud([$('#wc-canvas')[0], this.$el], this.wcOptions)

		// show all the event of a DOM
		// var e = $._data( canvas[0], "events" );
		// console.log(e);
	},


})

// Init instances
var pubs = new Publications();
var pubsView = new PubsView({ collection: pubs });

var pubsWcView = new PubsWordCloudView({ collection: pubs });
// Render view of the collection
$('#pubView').append(pubsView.render().el);   // adding 

// sort btn control
$("#sort-btn").click(function(){
	var sortKey = $(this).attr("sort-key")
	if (sortKey === 'myRank') {
		$(this).text('Sort by year');
		$(this).attr("sort-key", 'year');
	} else{
		$(this).text('Sort by my rank');
		$(this).attr("sort-key", 'myRank')
	};
	pubs.sortByKey(sortKey)
})
