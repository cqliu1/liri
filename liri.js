var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require("./keys.js");

var argv = process.argv.splice(2);

var command = argv[0];

switch(command) {
	case "my-tweets":
		displayTweets();
		break;
	case "spotify-this-song":
		spotifySong();
		break;
	case "movie-this":
		findMovie();
		break;
	case "do-what-it-says":
		doWhatItSays();
		break;
	default:
		console.log("Invalid command.");
}

function displayTweets() {
	var client = new Twitter(keys.twitterKeys);
	 
	var params = {screen_name: 'cathqliu'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets);
	  }
	});
}

function spotifySong() {
	var songName = argv[1];
 
	var spotify = new Spotify(keys.spotifyKeys);
	 
	spotify.search({ type: 'track', query: songName.trim() }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
	console.log(data); 
	});
}

function findMovie() {
	var movieName = argv[1];

	var requestURL = "http://www.omdbapi.com/?apikey=" + keys.omdbkey + "&t=" + movieName.trim().replace(/ /g,"+");	

	request( requestURL, function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred 
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  console.log('body:', body); // Print the HTML for the Google homepage. 
	});
	
}

function doWhatItSays() {
	fs.readFile('/random.txt', 'utf8', function(err, data) {
	  if (err) throw err;
	  console.log(data);
	});

	// switch(command) {
	// 	case "my-tweets":
	// 		displayTweets();
	// 		break;
	// 	case "spotify-this-song":
	// 		spotifySong();
	// 		break;
	// 	case "movie-this":
	// 		findMovie();
	// 		break;
	// 	case "do-what-it-says":
	// 		doWhatItSays();
	// 		break;
	// 	default:
	// 		console.log("Invalid command.");
	// }
}