var express = require('express');
var router = express.Router();
var Movie = require('../models/movies');

router.get('/',function(req,res){
	Movie.find({}).distinct('name',function(error,names){
		if(error){
			res.sendStatus(500);
		}
		else{
			res.json(names);
		}
	});
});

module.exports = router;