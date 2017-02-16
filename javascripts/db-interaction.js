'use strict';


let firebase = require('./firebaseConfig'),
        movieGetter = require('./movie-getter.js'),
        movieAPI = movieGetter(),
        storage = require('./localStorage.js');

// ****************************************
// DB interaction using Firebase REST API
// ****************************************

function searchOMDB (movie, movieYear) {
    console.log('inside search');
    
    return new Promise ( function ( resolve, reject ) {
        $.ajax({
            url: movieAPI.MDBurl,
            type: 'GET',
            data: { 
              query: movie, 
              append_to_response: "images", 
              include_image_language: "en",
              include_adult: "false",
              year: movieYear
            }
        }).done(
            function (movieData) {
            storage.setLocalAPI(movieData);
            resolve(movieData);
        }).fail(function (error){
            reject(error);
        });
    });
}

/*
 * Get the User's Movie List
 */
function getMovies (user) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: `https://movie-history-team-team.firebaseio.com/movies.json?orderBy="uid"&equalTo="${user}"`
        }).done(function(movieData){
            storage.setLocalFB(movieData);
            resolve(movieData);
        }).fail( function(error){
            reject(error);
        });
    });
}

function addMovie (movieFormObj) {

  console.log('add movie', movieFormObj);
  var duplicateCheck = storage.addLocalFB(movieFormObj);
  if (duplicateCheck === true) {
    return;
  } else {
    return new Promise ( function (resolve, reject ) {
        $.ajax ( {
            url: `https://movie-history-team-team.firebaseio.com/movies.json`,
            type: 'POST',
            data: JSON.stringify(movieFormObj),
            dataType: 'json'
        }).done(function (movieId) {
            resolve();
        });
    });
  }
}


function deleteMovie (movieId) {
    return new Promise ( function ( resolve, reject ) {
        $.ajax({
            url: `https://movie-history-team-team.firebaseio.com/movies/${movieId}.json`,
            method: 'DELETE'
        }).done( function () {
            resolve();
        });
    });
}

// function getMovie (movieId) {
//     return new Promise (function (resolve, reject) {
//         $.ajax ({
//             url: `https://moviehistory-e4b18.firebaseio.com/movies/${movieId}.json`,
//         }).done(function (movieData) {
//             resolve(movieData);
//         }).fail( function (error) {
//             reject (error);
//         });
//     });
// }


module.exports = {
    searchOMDB,
    getMovies,
    addMovie,
    deleteMovie
    // getMovie
};