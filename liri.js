//load node modules

require("dotenv").config();
var request = require("request");
var keys = require('./keys');
var fs = require('fs');
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var spotifyKey = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var params = {screen_name: "Emily McKenna", count: 20};

//takes in the command from LIRI which tells the app what to do
var args = process.argv;
var appCommand = args[2];
var userSearch = "";
//allow search to handle spaces
for (i = 3; i<args.length; i++) {
    userSearch += args[i] + " ";}
//sets action for command
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

//twitter function
function returnTweets(){

    client.get('statuses/user_timeline', params, function(error, tweets, response){
        console.log("Most Recent 20 Tweets")
        if (error) {
            console.log("Error: "+ err)
        }

        else {

            for (i = 0; i<tweets.length; i++){
                
                console.log("Tweet:" + tweets[i].text);
                console.log("Created at: " + tweets[i].created_at);

            }

        }
    })
};

//spotify function
function returnSpotify(song){
    console.log("Test");
    songName="";

    if (song === "") {

        songName = "The Sign Ace of Base"
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
   
      songData = data.tracks.items[0];

      //console.log(songData);
      console.log("Artist: " +songData.artists[0].name);
      console.log("Track Title: "+songData.name);
      console.log("Sample: "+songData.external_urls.spotify);
      console.log("Album: "+songData.album.name)
        


      });


};

//OMDB function

function returnOMDB(movie) {
    
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
        if (error){
            console.log("Error: "+error)
        }
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

//random function

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

