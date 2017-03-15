var express = require('express');
var router = express.Router();

router.get('/', function(req, res){

	url = 'https://www.uacinemas.com.hk/eng/cinemas/Cinemas?id=4';

	request(url, function(error, response, html){
		console.log("REQUEST")
		if(!error){
			var C = cheerio.load(html);

			var title, release, rating;
			var json = { title : "", release : "", rating : ""};
			C('.center_info').filter(function(){
				var data = C(this);
				title = data.children().first().text();

				//				release = data.children().last().children().text();

				json.title = title;
				totaltitles = [json]
				console.log(totaltitles)
				//				json.release = release;
			})

			// Since the rating is in a different section of the DOM, we'll have to write a new jQuery filter to extract this information.

			//			$('.star-box-giga-star').filter(function(){
			//				var data = $(this);
			//
			//				// The .star-box-giga-star class was exactly where we wanted it to be.
			//				// To get the rating, we can simply just get the .text(), no need to traverse the DOM any further
			//
			//				rating = data.text();
			//
			//				json.rating = rating;
			//			})
		}
//		fs.writeFile('output.json', JSON.stringify(json, null, 1), function(err){
//			var titlesArr = []
//			for(i = 0; i < json.length; i++){
//				if(titlesArr.includes(json[i].title)){
//					titlesArr.push(json[i].title)
//				}
//			
//			}
			console.log('File successfully written! - Check your project directory for the output.json file');
//		})
	})


	

	// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
	res.send('Check your console!')

})

//module.exports = router;