//load node modules

require("dotenv").config();
var request = require("request");
var keys = require('./keys');
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


//takes in the command from LIRI which tells the app what to do
var args = process.argv;
var appCommand = args[2];


//process for OMBD info

//empty variable for movie name
var movieName = "";

//for-loop to handle multi word movie titles
for (i=2; i <args.length; i++) {

    if (i >2 && i < nodeArgs.length) {
        movieName == movieName + "+" + args[i];
    }
    
    else {

        movieName += args[i];
    }
}

var querURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

console.log(queryURL);

request(queryUrl, function(error, response, body) {

    if(!error && response.statusCode ===200) {
        console.log("Title: "+ JSON.parse(body).Title);
        console.log("Release Year: "+ JSON.parse(body).Released);
        console.log("IMDB Rating: "+ JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: "+ JSON.parse(body).tomatoRating);
        console.log("Country: "+ JSON.parse(body).Country);
        console.log("Language: "+ JSON.parse(body).Language);
        console.log("Plot: "+ JSON.parse(body).Plot);
        console.log("Actors: "+ JSON.parse(body).Actors);
    }
}

