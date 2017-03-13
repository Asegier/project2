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

var app = express();

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

app.get('/scrape', function(req, res){
	// The URL we will scrape from - in our example Anchorman 2.

	url = 'https://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=4';

	// The structure of our request call
	// The first parameter is our URL
	// The callback function takes 3 parameters, an error, response status code and the html

	request(url, function(error, response, html){

		// First we'll check to make sure no errors occurred when making the request

		if(!error){
			// Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

			var CHEERS = cheerio.load(html);

			// Finally, we'll define the variables we're going to capture

			var title, release, rating;
			var json = { title : "", release : "", rating : ""};

			CHEERS('.center_info').filter(function(){

				// Let's store the data we filter into a variable so we can easily see what's going on.

				var data = CHEERS(this);

				// In examining the DOM we notice that the title rests within the first child element of the header tag. 
				// Utilizing jQuery we can easily navigate and get the text by writing the following code:

				title = data.children().first().text();
				console.log(title);

				// Once we have our title, we'll store it to the our json object.

				json.title = title;
			})
		}
	})
	fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

		console.log('File successfully written! - Check your project directory for the output.json file');

	});
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;

//		module.exports = app;
