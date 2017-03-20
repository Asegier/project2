var mongoose = require('mongoose');

var tempMovieSchema = new mongoose.Schema({
	
	name: String,
	district: String,
	cinema: String

});

var tempMovie = mongoose.model('tempMovies', tempMovieSchema);

module.exports = tempMovie;