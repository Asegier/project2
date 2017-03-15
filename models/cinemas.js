var mongoose = require('mongoose');

var cinemaSchema = new mongoose.Schema({
	
	name: String,
	location: String,
	address: String
});

var Cinema = mongoose.model('Cinemas', cinemaSchema);

module.exports = Cinema;