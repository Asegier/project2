var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema({
	
	name: String

});

var Movie = mongoose.model('Movies', movieSchema);

module.exports = Movie;