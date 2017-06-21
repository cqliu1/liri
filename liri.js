var fs = require("fs");
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
	
}

function spotifySong() {

}

function findMovie() {

}

function doWhatItSays() {

}