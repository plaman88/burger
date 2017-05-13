//Routing Logic

var express = require('express');
var router = express.Router();
var burgers = require('../models/burger.js');

//Root file
router.get('/', function(req, res) {
	res.redirect('/burgers');
});

//Route to create burgers as object
router.get('/burgers', function(req, res) {
	burgers.all(function(data) {
		var hbsObject = {
			burgers: data
		};
		//console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

//Post Route displaying burger devour status
router.post('/burgers/create', function(req, res) {
	console.log(req.body.name);
	console.log(req.body.devoured);
	burgers.create(['name', 'devoured'], [req.body.name, req.body.devoured], function() {
		res.redirect('/burgers');
	});
});

//Put route
router.put('/burgers/devour/:id', function(req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('burgers', condition);

	burgers.devour({
		devoured: req.body.devoured
	}, condition, function() {
		res.redirect('/burgers');
	});
});


//Delete
router.delete('/burgers/clear/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('burgers', condition);

	burgers.clear(condition, function() {
		res.redirect('/burgers');
	});
});

module.exports = router;
