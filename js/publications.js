// The Model for Publication
var Publication = Backbone.Model.extend({
	defaults: {
		title: '',
		doi: '',
		authors: [],
		journal: ''

	},
	parse: function(obj){
		parsedObj = {};
		parsedObj.title = obj.titles.title;
		parsedObj.doi = obj.doi;
		parsedObj.authors = obj.contributors;
		// I am the n-th author
		var myRank = parsedObj.authors.indexOf('Wang, Zichen') + 1;
		if (myRank === 0){
			myRank = parsedObj.authors.indexOf('Wang, Zi-Chen') + 1;
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

	initialize: function(){
		this.sortKey = 'year';
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
	}
});


// View for Collection of Publications
var PubsView = Backbone.View.extend({
	tagName: 'ol',
	initialize: function(){
		this.listenTo(this.collection, 'sync', this.render)
		
		// Fetch the default set of models for this collection from the url
		this.collection.fetch();

		this.listenTo(this.collection, 'sortedBy', this.rerender);
	},

	render: function(){
		this.collection.each(function(pub){
			var pubView = new PubView({model: pub});

			this.$el.append(pubView.el);
		}, this);
		return this; // returning this for chaining..
	},

	rerender: function(){
		// rerender when collection is sorted
		console.log('rerender called')
		this.$el.empty();
		this.render();
	}
});


// Init instances
var pubs = new Publications();
var pubsView = new PubsView({ collection: pubs });
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
	pubsView.collection.sortByKey(sortKey)
})
