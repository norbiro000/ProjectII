var Place = require('./controllers/myplace.controller');
var Content = require('./controllers/content.controller');

// app/routes.js
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/main', // redirect to the secure main section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/main', // redirect to the secure main section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// main SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/main', isLoggedIn, function(req, res) {
		res.render('main.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// PLACE ==============================
	// =====================================

	app.get('/myplace', isLoggedIn, function(req, res) {
		Place.getPlaceInformation(req.user.local.email, function(place){
			Content.getContent(req.user.local.email, function(err, content){
				if(err) return false;

				res.render('myplace.ejs', {
					place : place,
					content: content,
					user : JSON.stringify(req.user) // get the user out of session and pass to template
				});
			});
		});
	});

	app.put('/myplace', isLoggedIn, function(req, res) {
		Place.savePlaceInformation(req, res);
	});


	// =====================================
	// CONTENT ==============================
	// =====================================
	app.post('/content', isLoggedIn, function(req, res) {
		Content.addNewContent(req, res);
	});

	app.delete('/content/:content_id', isLoggedIn, function(req, res) {
		Content.deleteContent(req.params.content_id, function(){
			res.send("Saved");
		});
	});

	app.put('/content/:content_id', isLoggedIn, function(req, res) {
		Content.editContent(req.params.content_id, req.body, function(){
			res.send("Saved");
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
