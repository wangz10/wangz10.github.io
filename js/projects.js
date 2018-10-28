// The Model for Projects
var Project = Backbone.Model.extend({
    defaults: {
        title: '',
        desc: '',
        website: '',
        code: '',
        publication: '',
        img: '',
        tags: [],
        date: '',
    },
});


// View for Project Model
var ProjView = Backbone.View.extend({
    model: Project,
    tagName: 'div',
    className: 'col-md-6 d-flex flex-row align-items-stretch',
    template: _.template($('#projTemplate').html()),

    initialize: function() {
        this.render();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.fadeIn();
        return this;
    },

});

// Collection of Project Models
var Projects = Backbone.Collection.extend({
    model: Project,
    url: 'assets/projects.json',

    initialize: function() {
        // which key to sort the models by
        this.sortKey = 'year';

        // count tokens when fetch is called
        // this.listenTo(this, 'sync', this.countTokens)
    },


    sortByKey: function(key) {
        // sort collections by key
        this.sortKey = key;
        this.sort();
        this.trigger('sortedBy', { 'key': key });
    },

});


// View for Collection of Projects
var ProjectsView = Backbone.View.extend({
    tagName: 'div',
    className: 'row',
    initialize: function() {
        this.listenTo(this.collection, 'sync', this.render)

        // Fetch the default set of models for this collection from the url
        this.collection.fetch();
        // render again when its collection is sorted
        // this.listenTo(this.collection, 'sortedBy', this.render);
    },

    render: function() {
        // empty previously loaded DOMs on $el
        this.$el.empty();
        var idx = 0;
        this.collection.each(function(pub) {
            var projView = new ProjView({ model: pub });
            this.$el.append(projView.el);
            if (idx % 2 === 1) { // break to a new line
                this.$el.append($('<div class="w-100"></div>'));
            }
            idx++;
        }, this);
        return this; // returning this for chaining..
    },

});


// Init instances
var projs = new Projects();
var projsView = new ProjectsView({ collection: projs });

// Render view of the collection
$("#projects-container").append(projsView.render().el)