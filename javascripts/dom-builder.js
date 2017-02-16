'use strict';

let cardMovieTemplate = function(movie) {
    return new Promise(function(resolve, reject) {

        let cardItems = {
        		id: movie.id,
            image: movie.poster_path ? movie.poster_path : movie.poster,
            title: movie.title,
            year: movie.release_date ? movie.release_date.slice(0, 4) : movie.year,
            myRatings: movie.uid ? `${movie.ratings}` : "",
            popularity: Math.round(movie.popularity)
        };
        let cardTemplate = `
    												<div class="col-sm-6 col-md-4" data-movieId="${cardItems.id}">
                              <div class="thumbnail">
                                <img src="https://image.tmdb.org/t/p/w500${cardItems.image}" alt="Movie image ${cardItems.title}" onerror="this.onerror=null;this.src='sorry.jpeg';">
                                <div class="caption">
                                  <h3>${cardItems.title}</h3>
                                  <h3>${cardItems.year}</h3>
                                  <h3>${cardItems.popularity}</h3>
                                  <h3>${cardItems.myRatings}</h3>
                                </div>
                              </div>
                            </div>`;
        $('.movies-list').append(cardTemplate);
        resolve(cardTemplate);
        reject();
    });
};

module.exports = {cardMovieTemplate};
