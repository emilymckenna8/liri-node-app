require("dotenv").config();
var keys = require('./keys');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var fs = require('fs');

//takes in the command from LIRI which tells the app what to do
var args = process.argv;
var appCommand = args[2];
