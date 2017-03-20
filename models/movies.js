var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
	
	name: String,
	district: String,
	cinema: String,
	brand: String

});

var Movie = mongoose.model('Movies', movieSchema);

module.exports = Movie;