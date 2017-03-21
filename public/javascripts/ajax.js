function getData( url, method, data, cb){           //  init vars

	var returnedData = {};
	var error = undefined;

	$.ajax({                                    //  Call Server
		url: url,
		data: data,
		type: method,
		dataType: "json"
	})
		.done(function( json ){                     //  Success
		console.log("THIS IS THE JSON", json);
		returnedData = json;
	})
		.fail(function( xhr, status, err){          //  Error
		console.log("Error");
		console.log(err);
		console.log("Status", status);
		console.log("xhr", xhr);
		error = err;
	})
		.always(function( xhr, status){             //  Return the result
		cb(error, returnedData);
	})
}

var populateDropDown = function(error,returnedData){

	if(error){
		console.log(error);
	}
	//Code that populates drop down with returnedData
	for(var i = 0; i < returnedData.length; i++){
		var movie = returnedData[i].split(" ").join("+");
		$('#list').append($("<li><a href=/page/" + movie + ">" + returnedData[i] + "</a></li>"));
	}
	$('#list').append($("<li class = divider role = separator><a href=#>" + "</a></li>"));
	$('#list').append($("<li><a href=/toobad>" + "I am Retarded I need help" + "</a></li>"));

}

var findMovies = function (error, returnedData){
	if (error) {
		console.log(error);
	}
//	for(var i = 0; i < returnedData.length; i++){
//		var 
//		$(')
//	}
	console.log("FINDMOVIES IS A SUCCESS!")
	console.log(returnedData)
}

$( window ).load(function() {
	console.log("WINDOW IS LOADING")
	getData('http://localhost:3000/getMovies','GET',{},populateDropDown);
});

$('.list').on('click', function (e){
	console.log("THIS IS E.TARGET!", e.target.textContent);
	var name = e.target.textContent;
	getData('http://localhost:3000/page/'+name,'GET',{}, findMovies);

})

if ( window.addEventListener ) {
	var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
	window.addEventListener("keydown", function(e){
		kkeys.push( e.keyCode );
		if ( kkeys.toString().indexOf( konami ) >= 0 ){
			var roll_on=0;
			function doBarrelRoll()
			{
				document.body.style.msTransform='rotate(360deg)';
				document.body.style.msTransitionDuration='4s';
				document.body.style.msTransitionProperty='all';
				document.body.style.MozTransform='rotate(360deg)';
				document.body.style.MozTransitionDuration='4s';
				document.body.style.MozTransitionProperty='all';
				document.body.style.WebkitTransform='rotate(360deg)';
				document.body.style.WebkitTransitionDuration='4s';
				document.body.style.WebkitTransitionProperty='all';
				document.body.style.OTransform='rotate(360deg)';
				document.body.style.OTransitionDuration='4s';
				document.body.style.OTransitionProperty='all';
				setTimeout("document.body.removeAttribute('style'); roll_on = 0;",4000);
			}
			function startRoll()
			{
				if (!roll_on)
				{
					roll_on=1;
					doBarrelRoll();
				}
			}
			startRoll()
			kkeys = [];
		}
	}, true);
}