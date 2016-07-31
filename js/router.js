var removeActive = function(){
	$("ul.navbar-nav").children().each(function() {
		$(this).removeClass('active');
	});	
};


var Router = Backbone.Router.extend({
	
	el: "#page-content", // selector to load page content

	routes: {
		'': 'home',
		'resume': 'resume',
		'projects': 'projects',
		'publications': 'publications',
		'contact': 'contact',
		'invite': 'invitation',
	},

	home: function(){
		$(this.el).load("home.html", function() {
			removeActive();
			$("#home").addClass("active");
		});
	},

	resume: function(){
		$(this.el).load("resume.html", function() {
			removeActive();
			$("#resume").addClass('active');
		});
	},

	projects: function(){
		$(this.el).load("projects.html", function() {
			removeActive();
			$("#projects").addClass('active');
		});
	},

	publications: function(){
		$(this.el).load("publications.html", function() {
			removeActive();
			$("#publications").addClass('active');
		});
	},

	contact: function(){
		$(this.el).load("contact.html", function() {
			removeActive();
			$("#contact").addClass('active');
		});
	},

	invitation: function(){
		$("nav").hide();
		$(this.el).load("invitation.html", function() {
			//
		})
	}

});

var appRouter = new Router();
Backbone.history.start(); 
