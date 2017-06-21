var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');
var keys = require("./keys.js");

var argv = process.argv.splice(2);

var command = argv[0];

var inputName;

if(argv.length > 1)
	inputName = argv[1];

runCommand(command);

function runCommand(command) {
	switch(command) {
		case "my-tweets":
			myTweets();
			break;
		case "spotify-this-song":
			spotifyThisSong();
			break;
		case "movie-this":
			movieThis();
			break;
		case "do-what-it-says":
			doWhatItSays();
			break;
		default:
			console.log("Invalid command.");
	}
}

function myTweets() {
	var client = new Twitter(keys.twitterKeys);
	 
	// Note: I don't have any tweets, so I'm pulling tweets from nodejs.
	var params = {screen_name: 'nodejs'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    // console.log(tweets);
	    let output = "\nLast 20 Tweets:\n";
		for(let i = 0; i < 20; i++) {
			var date = new Date(tweets[i].created_at);
			output += moment(date).format("M/D/YY h:mm A:") + " " + tweets[i].text + "\n";
		}
		output += "\n";
		console.log(output);
		fs.appendFile("./log.txt",output,function(err) {
			if (err) throw err;
		})
	  }

	  
	});
}

function spotifyThisSong() {
	var songName = inputName;
 
	var spotify = new Spotify(keys.spotifyKeys);
	 
	spotify.search({ type: 'track', query: songName.trim() }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
	 
		var song = data.tracks.items[0];
		var artistString = "";

		if(song.artists.length === 1) {
			artistString = song.artists[0].name;
		} else {
			for(let i = 0; i < song.artists.length; i++) {
				artist = song.artists[i];
				artistString += artist.name + ", "
			}
		}
		let output = `
Artist(s): ${artistString}
Song Name: ${song.name}
Album: ${song.album.name}
Preview Link: ${song.preview_url}
		`;
		console.log(output);
		fs.appendFile("./log.txt",output,function(err) {
			if (err) throw err;
		})
	});
}

function movieThis() {
	var movieName = inputName;

	var requestURL = "http://www.omdbapi.com/?i=tt3896198&apikey=" + keys.omdbKey + "&t=" + movieName.trim().replace(/ /g,"+");	

	request( requestURL, function (error, response, body) {
		var movie = JSON.parse(body);

		let output = `
Title: ${movie.Title}
Year: ${movie.Year}
IMDB Rating: ${movie.imdbRating}
Country: ${movie.Country}
Language: ${movie.Language}
Plot: ${movie.Plot}
Actors: ${movie.Actors}
Website: ${movie.Website}
		`;

		console.log(output);
		fs.appendFile("./log.txt",output,function(err) {
			if (err) throw err;
		})
	});

}

function doWhatItSays() {
	fs.readFile('./random.txt', 'utf8', function(err, data) {
		if (err) throw err;
		// console.log(data);

		var args = data.split(",");
		
		if(args.length > 1)
			inputName = args[1];
		runCommand(args[0]);
	});
	
}