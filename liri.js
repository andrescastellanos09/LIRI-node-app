
// DEPENDENCIES
// =====================================
// Read and set environment variables
require("dotenv").config();

// Import the Twitter NPM package.
var Twitter = require("twitter");

// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");

// Import the API keys
var keys = require("./keys");

// Import the request npm package.
var request = require("request");

// Import the FS package for read/write.
var fs = require("fs");

// Initialize the twitter API client using our client id and secret 
var client = new Twitter(keys.twitter);

// Initialize the spotify API client using our client id and secret
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
process.argv.shift();// skip node
process.argv.shift();// skip file name
process.argv.shift();// skip first argument
var commandData = process.argv.join(" ");

var params = {
    screen_name: 'wsj',
    count: 20
};

function getTweets() {
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (var i = 0; i < tweets.length; i++) {
                console.log("==============================");
                console.log("Created: " + tweets[i].created_at);
                console.log("TWEETS: " + i)
                console.log(tweets[i].text);
                console.log("==============================");
            }
        }


    });
}
getTweets();
function spotifyfinder() {
    if (commandData) {
        var songName = commandData;
    } else {
        songName = "the sign";
    }
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        for (i = 0; i < 1; i++) {
            
            //console.log(data.tracks.items[i])
            console.log('Song: '+data.tracks.items[i].name) 
            console.log('Artist: '+data.tracks.items[i].artists[0].name)
            console.log('Preview link: '+data.tracks.items[i].preview_url)
        
            
           
        }
    }
    );
};
spotifyfinder();