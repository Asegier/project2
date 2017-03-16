var Cinema = require('../models/cinemas');
var request = require('request');
var cheerio = require('cheerio');
var Movie = require('../models/movies');

exports.getUACinemas = function(url){
console.log("HELLO!!! WE GOT THE SCRAPER!!!!")
	var totalcinemas = []
	request(url, function(error, response, html){
		console.log("REQUEST")
		if(!error){
			var C = cheerio.load(html);

			var title, release, rating;
			var json = { title : ""};
			C('.cinemas').filter(function(){
//				var data = C(this)
//					console.log(JSON.parse(data))
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
			})
		}
//		console.log(totalcinemas)
//			var titlesArr = []
//			for(i = 0; i < totalcinemas.length; i++){
//				if(!titlesArr.includes(totalcinemas[i])){
//					titlesArr.push(totalcinemas[i])
//				}
//		}
//		console.log(titlesArr)
			console.log('CINEMASSSS');
	})
}

exports.getMCLCinemas = function (url){
	request(url, function(error, response, html){
		if(!error){
			var data = JSON.parse(html);
			for(i = 0; i < data.length; i++){
				var cinema = new Cinema();
				cinema.name = data[i].n;
				cinema.address = data[i].a;
				cinema.save();
				console.log("Name: " + cinema.name, "Address: " + cinema.address)
			}
		}
	})
}


exports.getUAMovies = function (url){
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