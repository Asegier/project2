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
			var districts = []
			for(i = 0; i < names.length; i++){
				if(!districts.includes(names[i].district)){
					districts.push(names[i].district)
				}
			}
			var brand = names[0].brand;
			res.render('page', {districts: districts, name: name, brand: brand});
		}
	})
})

//router.get('/movieInfo?movieName=:name', function(req, res){
//	var linkname = req.params.name
//	var name = req.params.name.split('+').join(' ');
//	//	console.log()
//	console.log(name)
//	var html = "http://www.omdbapi.com/?t=" + linkname + "&y=2017"
//	request(url, function (error, response, html){
//		if(!error){
//			var data = JSON.parse(html);
//			var description = data.plot;
//			var specificMovie = Movie.find({name}, function(err, names){
//
//				if(err){
//					res.sendStatus(500);
//				}
//				else{
//					var districts = [];
//					for(var i = 0; i < names.length ; i++){
//						districts.push(names[i].district);
//					}
//					res.render('page', {description: description, district:district});
//				}
//			})
//		}
//	})
//})



module.exports = router;
