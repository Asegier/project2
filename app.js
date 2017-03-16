var express 		= require('express');
var path 			= require('path');
var favicon 		= require('serve-favicon');
var logger 			= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var request 		= require('request');
var cheerio 		= require('cheerio');
var fs 				= require('fs');

var index 			= require('./routes/index');
var users 			= require('./routes/users');
var movieGrabber 	= require('./routes/page')
var scraper 		= require('./utils/scraper');

var app 			= express();

// Connect with MongoDB
var mongoose 		= require('mongoose');
mongoose.connect('mongodb://localhost/project_2');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/page', movieGrabber)


//	scraper.getMCLCinemas('http://www4.mclcinema.com/MCLWebAPI2/GetCinemaDetails.aspx?l=2')
			
//scraper.getUACinemas('http://www.uacinemas.com.hk/eng/main/HomePage')
//getUACinemas('http://www4.mclcinema.com/index.aspx?visLang=2')

var CronJob = require('cron').CronJob;
new CronJob('01 * * * * *', function() {
  console.log('You will see this message every 5 seconds');
}, null, true, 'Asia/Hong_Kong');

const UAcwb 		= 'https://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=4';
const UAiMaxmk 		= 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=24';
const UAiMaxklnbay 	= 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=15';
const UAiMaxtst 	= 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=19';
const UAPCtst 		= 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=25';
const UAmk 			= 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=23';
const UAtst 		= 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=18';
const UAklnbay 		= 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=14';
const UAtuenmun 	= 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=17';
const UAshatin 		= 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=1';
const UAairport 	= 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=22';
//const MCL 		= ;
//const BROAD 		= ;
debugger;
/* Cinema & Movies
Feedback all the Cinemas in a given location
*/

app.get('/scrape', function(req, res){

	scraper.getUAMovies(UAcwb);
	scraper.getUAMovies(UAiMaxmk);
	
	
	res.send('Check your console!')

})



app.get('/toobad', function(req, res){
	res.send('Please contact the nearest Mental Facility near you.')
})

var Movie = require('./models/movies')
//console.log(Movie.find('name'))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
