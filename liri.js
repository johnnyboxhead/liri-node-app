require("dotenv").config();
var fs = require("fs");
var request = require("request");
var spotifyKey = require("./keys.js").spotify;
var twitterKey = require("./keys.js").twitter;
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var action = process.argv[2];
var requestItem = process.argv[3];
var omdbQueryUrl;

var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: spotifyKey.id,
  secret: spotifyKey.secret
});

var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: twitterKey.consumer_key,
    consumer_secret: twitterKey.consumer_secret,
    access_token_key: twitterKey.access_token_key,
    access_token_secret: twitterKey.access_token_secret
});

if (action === "do-what-it-says") {
    fs.readFile("random.txt", "upf8", function(error, data){
        var splitData = data.split(",")
        console.log(splitData)
    })
    action = "spotify-this-song"
}

if (action === "spotify-this-song"){
    if(!requestItem){
        requestItem = "The Sign"
    }
    spotify.search({ type: 'track', query: requestItem }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;  //from spotify npm docs
        }
        else{
            console.log(data.tracks.items[0].artists[0].name)
            console.log(requestItem)
            console.log(data.tracks.items[0].preview_url)
            console.log(data.tracks.items[0].album.name)
        }
    });
}

if (action === "my-tweets"){
    var params = {screen_name: 'johnnyboxhead'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i=0; i < tweets.length; i++) { 
                console.log(tweets[i].text);
            }    
        }
    });
}

if (action === "movie-this"){
    if(!requestItem){
        requestItem = "Mr. Nobody"
    }
    omdbQueryUrl = "http://www.omdbapi.com/?t=" + requestItem + "&y=&plot=short&apikey=trilogy";
    request(omdbQueryUrl, function(error, response, body){
        // console.log(body);
        console.log("Title is: " + JSON.parse(body).Title);
        console.log("This movie was made in: " + JSON.parse(body).Year);
        console.log("This movie's IMDB rating is: " + JSON.parse(body).Ratings[0].Value);
        console.log("This movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
        console.log("This movie was produced in: " + JSON.parse(body).Country);
        console.log("This movie is in: " + JSON.parse(body).Language);
        console.log("The plot of the movie is: " + JSON.parse(body).Plot);
        console.log("This movie featured the following actors: " + JSON.parse(body).Actors)
    })
}





