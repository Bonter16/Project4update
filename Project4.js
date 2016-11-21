/**
 * Created by Kenzie on 10/17/2016.
 */
/**
 *   @author Bonter, Brian (Bonterb@student.ncmich.edu)
 *   @version 0.0.3
 *   @summary Project 3  || created: 10.20.2016
 *   @todo
 */

"use strict";
const PROMPT = require('readline-sync');

let movieTitle = [], movieRating = [], avgRating = [], totalRating = [], movie = [];
let continueResponse, whichTitle, movieNames;
let movies = []
const MAX_RATING = 5

function main() {
    const SD_ARRAY = 0,
        MD_ARRAY = 1;
    process.stdout.write('\x1Bc'); //Clears the screen
    setContinueResponse();
    while (continueResponse === 1) {
        setWhichTitle();
        if (whichTitle === SD_ARRAY) {
            setMovieNames();
            for (let i = 0; i < movieNames; i++) {
                populateMovieTitle(i);
                populateMovieRating(i);
                //populateAvgRating(i);
                populateTotalRating(i);
                process.stdout.write('\x1Bc');
            }
        } else if (whichTitle === MD_ARRAY) {
            populateMovie();
        } else {
            populateMoviesMap();
        }
        setContinueResponse();
    }
    if (whichTitle === 0) {
        printParallelArrays();
    } else if (whichTitle === 1) {
        printMovie();
    } else {
        printMovies();
    }
    printGoodbye();
}

main();

function setContinueResponse() {
    if (continueResponse === 1) {
        continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));
        if (continueResponse !== 0 && continueResponse !== 1) {
            console.log(`${continueResponse} is an incorrect value. Please try again.`);
            continueResponse = 1;
            setContinueResponse();
            return main();
        }
    } else {
        continueResponse = 1;
    }
}

function setWhichTitle() {
    while (typeof whichTitle === 'undefined' || isNaN(whichTitle) || whichTitle < 0 || whichTitle > 2) {
        whichTitle = Number(PROMPT.question(`\nWhich collection do you wish to use? [0=SD Array, 1=MD Array, 2=Map]: `));
    }
}

function setMovieNames() {
    while (typeof movieNames === 'undefined' || isNaN(movieNames) || movieNames < 1 || movieNames > 10) {
        movieNames = Number(PROMPT.question(`\nHow many movies to rate? (Not more than 10): `));
    }
}

function populateMovieTitle(index) {
    while (typeof movieTitle[index] === 'undefined' || !/(^[a-z]+$){1,30}/i.test(movieTitle[index])) {
        movieTitle[index] = PROMPT.question(`Please enter movie title: `);
    }
}

function populateMovieRating(index) {
    while(typeof movieRating[index] === 'undefined' || isNaN(movieRating[index]) || movieRating[index] < 0 || movieRating[index] > 5) {
        movieRating[index] = Number(PROMPT.question(`Please enter Movie Rating: `));
    }
}

function populateTotalRating(index) {
        while(typeof totalRating[index] === 'undefined' || isNaN(totalRating[index]) || totalRating[index] < 0) {
            totalRating[index] = movieRating;
        }
}

function populateMovie() {
    const COLUMNS = 2;
    let numMovies = 0;
    while (isNaN(numMovies) || numMovies < 1 || numMovies > 10) {
        numMovies = Number(PROMPT.question(`\nHow many Movies to enter? (Not more than 10): `));
    }
    process.stdout.write('\x1Bc');
    for (let i = 0; i < numMovies; i++) {
        movie[i] = [];
        for (let j = 0; j < COLUMNS; j++) {
            if (j === 0) {
                while (typeof movie[i][j] === 'undefined' || !/(^[a-z]+$){1,30}/i.test(movie[i][j])) {
                    movie[i][j] = PROMPT.question(`Please enter Movie title name: `);
                }
            } else if(j === 1) {
                while (typeof movie[i][j] === 'undefined'|| isNaN(movie[i][j]) || movie[i][j] < 0 || movie[i][j] <= 5){
                    movie[i][j] = PROMPT.question(`Please enter movie rating: `);
                }
            }
        }
    }
    process.stdout.write('\x1Bc');
}

function populateMoviesMap() {
    movies = {'movie': []};
    const COLUMNS = 3;
    let numMovies = 0;
    while (isNaN(numMovies) || numMovies < 1 || numMovies > 10) {
        numMovies = Number(PROMPT.question(`\nHow many movies to enter? (Not more than 10): `));
    }
    process.stdout.write('\x1Bc');
    for (let i = 0; i < numMovies; i++) {
        let movies = [];
        for (let j = 0; j < COLUMNS; j++) {
            if (j === 0) {
                while (typeof movie[j] === 'undefined' || !/(^[a-z]+$){1,30}/i.test(movie[j])) {
                    movies[j] = PROMPT.question(`Please enter Movie title: `);
                    movies.movie.push({'movieTitle': movie[j]});
                }
            } else if (j === 1) {
                while (typeof movie[j] === 'undefined' || isNaN(movie[i][j]) || movie[i][j] < 0 || movie[i][j] <= 5) {
                    movies[j] = PROMPT.question(`Please give movie a rating: `);
                    movies.person.push({'movieRating': movie[j]});
                }
            }
        }
        process.stdout.write('\x1Bc');
    }
}

function printParallelArrays() {
    for (let i = 0; i < movieTitle.length; i++) {
        console.log(`${movieTitle[i]}, ${movieRating[i]}`);
    }
}

function printMovie() {
    const COLUMNS = 3;
    for (let i = 0; i < movie.length; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            console.log(movie[i][j]);
        }
    }
}

function printMovies() {
    for (let i = 0; i < movies.movie.length; i++) {
        console.log(movies.movie[i]);
    }
}



function printGoodbye() {
    console.log(`\tGoodbye.`);
}