var jwt    = require('jsonwebtoken');
var Place = require('./controllers/myplace.controller');
var Content = require('./controllers/content.controller');
var Voucher = require('./controllers/voucher.controller');
var Service = require('./controllers/service.controller');
var Subscriber = require('./controllers/subscribe.controller');
var Company = require('./controllers/user.controller');
var User = require('./models/user');
var Request = require('./models/request');
// var api = require('./apiRoute');

// app/routes.js
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.get('/myagency',isLoggedIn , function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('myagency.ejs', { message: req.flash('loginMessage') });
	});

	app.get('/myAgencyList',isLoggedIn , function(req, res) {
		// render the page and pass in any flash data if it exists
		User.find({ _id : { "$in":  req.user.partners }}, function( err, respon){
    	if (err) return false
    		res.json(respon)
    	});
	});

	app.get('/agencyRequest',isLoggedIn, function(req, res) {
		// render the page and pass in any flash data if it exists
		// console.dir('HEKLO');
		Request.find({to_id:req.user._id , req_status : 0}, function(err, requests){
			if(err)
				return false
			console.dir(req.user._id);
			console.dir(requests);
			res.json(requests)
		});
		// res.render('myagency.ejs', { message: req.flash('loginMessage') });
	});

	app.post('/api/authenticate/', function(req, res){
        User.findOne({ 'local.email' :  req.body.email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user){
                res.json({'status':'false'}); // req.flash is the way to set flashdata using connect-flash
            	return false;
            }

            // if the user is found but the password is wrong
            if (req.body.password != null || req.body.password != ""){
            	if (!user.validPassword(req.body.password))
                	res.json({'status':'false'}); // create the loginMessage and save it to session as flashdata
            }
            // all is well, return successful user
            // req.session.email = email //save session to user
            var token = jwt.sign(req.body.email, app.get('superSecret'), {
          		// expiresIn: '1000s', // expires in 24 hours
        	});

        	console.dir("LOGIN SUCCESS")

            res.json({status:"success",token:token})
        });
	});

	app.get('/api/genToken/:token', function(req, res){
        var token = jwt.sign(req.params.token, app.get('superSecret'), {
          		expiresIn: '1000s', // expires in 24 hours
        	});
        res.json(token);
	});

	app.get('/api/authenticatetest/:token', function(req, res){
		if (req.params.token){
		jwt.verify(req.params.token, app.get('superSecret'), function(err, decoded) {      
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });    
	      } else {
	        // if everything is good, save to request for use in other routes
	        res.send(decoded);
	        req.decoded = decoded;    
	      }
	    });
	}

	});

	app.get('/api/getOperator/:token', function(req, res){
		if (req.params.token){
			jwt.verify(req.params.token, app.get('superSecret'), function(err, decoded) {      
		      if (err) {
		        return res.json({ success: false, message: 'Failed to authenticate token.' });    
		      } else {
		        // if everything is good, save to request for use in other routes
		        // res.json(decoded);
		        User.find({},'companyName address',function (err, users){
		        	res.json(users);
		        })
		        // req.decoded = decoded;
		        // var arr = ['Tiger Kingdom','Phi Phi'];
		        // res.json(arr);
		        // Place.getPlaceInformation();
		      }
		    });
		}
		
	});

	app.get('/api/getOperatorById/:token/:operator_id', function(req, res){
		if (req.params.token){
			jwt.verify(req.params.token, app.get('superSecret'), function(err, decoded) {      
		      if (err) {
		        return res.json({ success: false, message: 'Failed to authenticate token.' });    
		      } else {
		        // if everything is good, save to request for use in other routes
		        // res.json(decoded);
		        User.findById( req.params.operator_id ,function (err, users){
		        	// console.dir(users)
		        	Service.getService(users.local.email, function(services){
		        		res.json(services);
		        	})
		        	
		        })
		        // req.decoded = decoded;
		        // var arr = ['Tiger Kingdom','Phi Phi'];
		        // res.json(arr);
		        // Place.getPlaceInformation();
		      }
		    });
		}
		
	});

	app.get('/api/getMyOperator/:token', function(req, res){
		if (req.params.token){
			jwt.verify(req.params.token, app.get('superSecret'), function(err, decoded) {      
		      if (err) {
		        return res.json({ success: false, message: 'Failed to authenticate token.' });    
		      } else {
		        // if everything is good, save to request for use in other routes
		        // res.json(decoded);
		        req.decoded = decoded; 
		        // console.dir(req)
		        // var arr = ['Tiger Kingdom','Phi Phi'];

		        // getCompanyAPI
		        // res.json(arr);
		        // Place.getPlaceInformation();
		        
		        User.findOne({ 'local.email' :  decoded }, function(err, user) {
		        	// console.dir(user.partners)

		        	Company.getCompanyAPI(user.partners, function (myCompany){
		        		// console.dir(myCompany)
		        		// console.dir("load")
		        		res.json(myCompany);
		        	});
		        });
		      }
		    });
		}
		
	});

	app.post('/api/addPartner/:token',function (req, res){
		if (req.params.token){
			jwt.verify(req.params.token, app.get('superSecret'), function(err, decoded) {      
		      if (err) {
		        return res.json({ success: false, message: 'Failed to authenticate token.' });    
		      } else {
		        // if everything is good, save to request for use in other routes
		        // res.json(decoded);
		        // req.decoded = decoded; 
		        // console.dir(req)
		        // var arr = ['Tiger Kingdom','Phi Phi'];

		        // getCompanyAPI
		        // res.json(arr);
		        // Place.getPlaceInformation();
		        
		        User.findOne({ 'local.email' :  decoded }, function(err, user) {
		        	// console.dir(user.partners)
		        	// res.json("Yow");
		        	Request.findOne({ from_id: user._id, to_id: req.body.to_id}, function(err, request){

		        		if(!request){
		        			var request = new Request({
		        				from_id		: 	user._id,
		        				to_id   	: 	req.body.to_id,
		        				req_status	: 	0
		        			})

		        			request.save(function(err){
		        				if(err)
		        					res.json(err)
		        				res.json("success");
		        			});
		        		}else{
		        			if(request.req_status == 2){
		        				request.req_status = 0;

		        				request.save(function(err){
		        				if(err)
		        					res.json(err)
		        				res.json("success");
		        			});
		        			}
		        			res.json("You used to request this");
		        		}
		        		
		        	});

		        	// Company.getCompanyAPI(user.partners, function (myCompany){
		        	// 	// console.dir(myCompany)
		        	// 	// console.dir("load")
		        	// 	res.json(myCompany);
		        	// });
		        // res.json("Yow");
		        });
		      }
		    });
		}

		console.dir(req.params.token);
		// res.json("falseeee");
	});

	app.put('/responseToRequest',isLoggedIn, function(req, res){
		Request.findOne({_id: req.body.request_id}, function(err, request){
			if(req.body.req_status!=null && request.req_status!=null){
				if(req.body.req_status == 1){
					request.req_status =  Number(req.body.req_status);
					Subscriber.subscriber(request.from_id, request.to_id);
					Subscriber.subscriber(request.to_id, request.from_id);
					request.save(function(){
						res.json("UPDATE "+request.to_id+":"+request.from_id);
					})
				}
				if(req.body.req_status == 2){
					request.req_status = 2;
					request.save(function(){
						res.json("UPDATED ");
					})
					
				}
			}else{
				res.json("FALSE"+req.body.req_status+"  "+request.req_status)
			}
		});
	});



	app.post('/loginAPI', passport.authenticate('local-mobile-login'));

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

	app.get('/myInformation', isLoggedIn, function(req, res) {
		User.findOne({ 'local.email': req.user.local.email}, function (err, user){
			res.json(user);
		})
	});

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

	app.put('/address', isLoggedIn, function(req, res) {
		User.findOne({ 'local.email' : req.user.local.email}, function (err, user){

			if(req.body.address != null || req.body.address!= undefined){
				user.address = req.body.address
				user.save(function(err){
					if(err)
						res.send("err");

					res.send("complate")
				})
			}else{
				res.send("err");
			}
		});
	});

	// =====================================
	// CONTENT ==============================
	// =====================================
	app.get('/mycustomer', isLoggedIn, function(req, res) {
		res.render('mycustomer.ejs', { message: req.flash('signupMessage') });
	});



	// =====================================
	// SERVICE ==============================
	// =====================================

	app.get('/api/myService/:token', function(req, res) {
		if (req.params.token){
			jwt.verify(req.params.token, app.get('superSecret'), function(err, decoded) {      
		      if (err) {
		        return res.json({ success: false, message: 'Failed to authenticate token.' });    
		      } else {
		        // if everything is good, save to request for use in other routes

		        req.decoded = decoded;
		        User.findOne({'local.email':decoded} ,'partners', function( err, respon){
		        	Service.getMyService(respon.partners, function(services){
						res.json(services);
					});
		    	});

		      }
		    });
		}
	});

	app.get('/service', isLoggedIn, function(req, res) {
		Service.getService(req.user.local.email, function(services){
			res.json(services);
		});
	});

	app.get('/service/:service_id', isLoggedIn, function(req, res) {
		Service.getServiceById(req.params.service_id, function(services){
			res.json(services);
		});
	});

	app.post('/service', isLoggedIn, function(req, res) {
		// console.dir(req.body);
		Service.saveService(req,function(){
			res.json("Success");
		});
	});

	app.put('/service/:service_id', isLoggedIn, function(req, res) {
		Service.editService(req, function(service){
			res.json(service);
		})
	});

	app.delete('/service/:service_id', isLoggedIn, function(req, res) {
		Service.deleteService(req, function(){
			res.send("Success");
		})
	});




	// =====================================
	// VOUCHER ==============================
	// =====================================

	app.post('/api/booking/:token', function(req, res) {
		// res.json( [{name:'fuck',image:'asdf.jpg'},{name:'ceme2',image:'2.jpg'}] );


		if (req.params.token){
			jwt.verify(req.params.token, app.get('superSecret'), function(err, decoded) {      
		      if (err) {
		        return res.json({ success: false, message: 'Failed to authenticate token.' });    
		      } else {
		        // if everything is good, save to request for use in other routes

		        req.decoded = decoded;
		        Voucher.apiInsertVoucher(decoded, req, function(voucher){
					res.json(voucher);
				});
		      }
		    });
		}

	});

	app.get('/api/voucher/:token', function(req, res) {
		if (req.params.token){
			jwt.verify(req.params.token, app.get('superSecret'), function(err, decoded) {      
		      if (err) {
		        return res.json({ success: false, message: 'Failed to authenticate token.' });    
		      } else {
		        // if everything is good, save to request for use in other routes

		        req.decoded = decoded;
		        Voucher.apiGetVoucher(decoded, req, function(voucher){
					res.json(voucher);
				});
		      }
		    });
		}
	});

	app.get('/voucher', isLoggedIn, function(req, res) {
		// res.json( [{name:'fuck',image:'asdf.jpg'},{name:'ceme2',image:'2.jpg'}] );
		Voucher.getVoucher(req.user.local.email, function(voucher){
			res.json(voucher);
		});
	});

	app.put('/voucher/state/:voucher_id', isLoggedIn, function(req, res) {
		Voucher.setStateVoucher(req.params.voucher_id, req.body.state, function(voucher){
			res.json(voucher);
		});
	});

	

	// app.post('/voucher', isLoggedIn, function(req, res) {
	// 	Voucher.insertVoucher();
	// });

	// app.put('/voucher/:voucher_id', isLoggedIn, function(req, res) {
	// 	Voucher.editVourcher();
	// });

	// app.delete('/voucher/:vourcher_id', isLoggedIn, function(req, res) {
	// 	Voucher.deleteVourcher();
	// });


	// =====================================
	// Subscriber ==============================
	// =====================================
	app.put('/subscribe/', isLoggedIn, function(req, res) {
		// console.dir(req);
		Subscriber.subscriber(req.user._id, req.body.partner_ids);
		res.send("200 OK");
	});



	app.get('/place', isLoggedIn, function(req, res) {

		Place.getPlaceAPI(req.user.partners, function(places) {
			res.json(places);
		});
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
