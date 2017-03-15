var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var index = require('./routes/index');
var users = require('./routes/users');
var scraper = require('./utils/scraper');

var app = express();

// Connect with MongoDB
var mongoose = require('mongoose');
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

var Cinema = require('./models/cinemas');
var getUACinemas = function (url){
	var totalcinemas = []
	request(url, function(error, response, html){s
		console.log("REQUEST")
		if(!error){
			var C = cheerio.load(html);

			var title, release, rating;
			var json = { title : ""};
			C('.cinemas').filter(function(){
				
				/*
				var data = C(this);
				title = data.children().children().text()
				json.title = title;
				
				console.log("title", data.children().children());
				
				*/
				
				var data = C('.cinemas ul li');
				for(i = 0; i < C(data).length; i++ ){
					var cinema = new Cinema();
					cinema.name = C(data[i]).text();
					cinema.save();
					console.log(C(data[i]).text());
				}
//				console.log(C(data).length)
				
				totalcinemas.push(json.title)
			})
		}
//		console.log(totalcinemas)
			var titlesArr = []
			for(i = 0; i < totalcinemas.length; i++){
				if(!titlesArr.includes(totalcinemas[i])){
					titlesArr.push(totalcinemas[i])
				}
			}
//		console.log(titlesArr)
			console.log('CINEMASSSS');
//		})
	})
}

//getUACinemas('http://www.uacinemas.com.hk/eng/main/HomePage')
getUACinemas('http://www4.mclcinema.com/index.aspx?visLang=2')


var express = require('express');
var router = express.Router();

var Movie = require('./models/movies')
var getUAMovies = function (url){
	var totaltitles = []
	request(url, function(error, response, html){
		console.log("REQUEST")
		if(!error){
			var C = cheerio.load(html);

			var title, release, rating;
			var json = { title : ""};
			C('.center_info').filter(function(){
				var data = C(this);
				title = data.children().first().text();

				json.title = title;
				totaltitles.push(json.title)
				
			})
		}
		console.log(totaltitles)
			var titlesArr = []
			for(i = 0; i < totaltitles.length; i++){
				if(!titlesArr.includes(totaltitles[i])){
					titlesArr.push(totaltitles[i])
					var movie = new Movie();
					movie.name = totaltitles[i]
					movie.save()
				}
			}
		console.log(titlesArr)
			console.log('File successfully written! - Check your project directory for the output.json file');
//		})
	})
}

const UAcwb = 'https://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=4';
const UAiMaxmk = 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=24';
const UAiMaxklnbay = 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=15';
const UAiMaxtst = 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=19';
const UAPCtst = 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=25';
const UAmk = 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=23';
const UAtst = 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=18';
const UAklnbay = 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=14';
const UAtuenmun = 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=17';
const UAshatin = 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=1';
const UAairport = 'http://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=22'
//const MCL = ;
//const BROAD = ;

/* Cinema & Movies
Feedback all the Cinemas in a given location
*/

app.get('/scrape', function(req, res){

	getUAMovies(UAcwb)
	
	res.send('Check your console!')

})




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
