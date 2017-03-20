var express = require('express');
var router = express.Router();
var Movie = require('../models/movies');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('page', { title: 'Welcome to Movite!' });
});

router.get('/:name', function(req, res){
	var name = req.params.name.split('+').join(' ');
//	console.log()	
	console.log(name)
	var specificMovie = Movie.find({name}, function(err, names){
		if(err){
			res.sendStatus(500);
		}
		else{
			res.json(names);
		}
	})
})

module.exports = router;
