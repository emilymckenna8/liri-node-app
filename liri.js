//load node modules

require("dotenv").config();
var request = require("request");
var keys = require('./keys');
var fs = require('fs');
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var spotifyKey = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


//takes in the command from LIRI which tells the app what to do
var args = process.argv;
var appCommand = args[2];
var userSearch = "";
for (i = 3; i<args.length; i++) {
    userSearch += args[i] + " ";}

if (appCommand === "my-tweets") {
    returnTweets();
}

if (appCommand === "spotify-this-song") {
    returnSpotify(userSearch);
}

if (appCommand === "movie-this") {
    returnOMDB(userSearch);
}

if (appCommand === "do-what-it-says") {
    randomRequest();
}


//process for OMBD info
function returnTweets(){



client.get('statuses/user_timeline',{})
};

function returnSpotify(song){
    console.log("Test");
    songName="";

    if (appCommand === "") {

        songName = "The Sign"
        console.log(songName);
    }

    else {
        songName = song;
        console.log(song)
    }

    spotifyKey.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.tracks); 
      });


};

function returnOMDB(movie) {
    //empty variable for movie name
    var movieName = "";

    if(movie === "") {

        movieName = "Mr+Nobody+"

    } 
    else {
        movieName = movie
    }   

    movieName = movieName.split(" ").join("+");


    console.log(movieName)
    

    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    console.log(queryURL);

    request(queryURL, function(error, response, body) {

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
        
    });

};


function randomRequest(){
    fs.readFile("./random.txt","utf8",function(error, data) {
        if (error) {
            console.log(error);
        }

        else {
            var randomData = data.split(",");
            if (randomData[0] === "spotify-this-song") {
                returnSpotify(randomData[1]);
                
            }
            if (randomData[0] === "movie-this"){
                returnOMDB(randomData[1]);
            }

        };
    });
}

