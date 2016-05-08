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
			parsedObj.year = obj.dates.year;
		} else {
			parsedObj.year = obj.dates;
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
		return this;
	},

});


// Collection of Publication Models
var Publications = Backbone.Collection.extend({
	model: Publication,
	url: 'assets/publications.json',
});


// View for Collection of Publications
var PubsView = Backbone.View.extend({
	tagName: 'ol',
	initialize: function(){
		this.listenTo(this.collection, 'sync', this.render)

		this.collection.fetch();
	},

	render: function(){
		this.collection.each(function(pub){
			var pubView = new PubView({model: pub});
			this.$el.append(pubView.el);
		}, this);
		return this; // returning this for chaining..
	}
});


// Init instances
var pubs = new Publications();
var pubsView = new PubsView({ collection: pubs });
// Render view of the collection
$('#pubView').append(pubsView.render().el);   // adding 

