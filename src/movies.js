// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    return moviesArray.map(elem => elem.director);
}

function getAllUniqueDirectors(moviesArray) {
    let allDirectors = moviesArray.map(elem => elem.director);
    let uniqueDirectors = [];
    for (director of allDirectors) {
        if (!allDirectors.includes(director)) {
            uniqueDirectors.push(director);
        }
    }
    return uniqueDirectors;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    let dramaMovies = moviesArray.filter(movie => movie.genre.includes('Drama'))
    let counter = 0;
    for (movie of dramaMovies) {
        if (movie.director === 'Steven Spielberg') {
            counter ++;
        }
    }
    return counter;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    let average = 0
    for (movie of moviesArray) {
        if (movie.score) {
            average += movie.score;
        }
    }
    return moviesArray.length !== 0 ? parseFloat((average / moviesArray.length).toFixed(2)) : 0
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    let dramaArray = moviesArray.filter(movie => movie.genre.includes('Drama'))
    let average = 0
    for (movie of dramaArray) {
        if (movie.score) {
            average += movie.score;
        }
    }
    return dramaArray.length !== 0 ? parseFloat((average / dramaArray.length).toFixed(2)) : 0
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    let newMoviesArray = JSON.parse(JSON.stringify(moviesArray));
    newMoviesArray.sort((movie1, movie2) => {
        if (movie1.title) {
          movie1title = movie1.title.toUpperCase();
          movie2title = movie2.title.toUpperCase();
        }
        if (movie1.year - movie2.year < 0) {
            return -1;
        }
        if (movie1.year - movie2.year > 0) {
            return 1;
        }
        if (movie1title < movie2title) {
            return -1;
        }
        if (movie1title > movie2title) {
            return 1;
        }
        return 0;
    });
    return newMoviesArray
}


// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

function orderAlphabetically(moviesArray) {
    let titleArray = moviesArray.map(movie => movie.title).sort((a, b) => {
        let nameA = a.toUpperCase();
        let nameB = b.toUpperCase();
        if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
    });
    let first20 = [];
    let i = 0;
    while (i < 20) {
        if (titleArray[i]) {
            first20.push(titleArray[i]);
        }
        i++;
    }
    return first20;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    let copyArray = JSON.parse(JSON.stringify(moviesArray));
    let minutesArray = copyArray.map(movie => {
        let minutes = parseInt(movie.duration[0])*60;
        if (movie.duration.includes("min")) {
            minutes += parseInt(movie.duration.slice(3,movie.duration.indexOf("m")));
        }
        movie.duration = minutes
        return movie;
    });
    return minutesArray;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average

function bestYearAvg(moviesArray) {
    if (moviesArray.length === 0) {
        return null;
    }
    let copyArray = JSON.parse(JSON.stringify(moviesArray));
    copyArray.sort((a, b) => a.year - b.year);
    let moviesInYear = 1;
    let bestYear = 0;
    let bestScore = 0;
    for (let i = 0; i < copyArray.length; i++) {
        if (i === copyArray.length - 1 || copyArray[i+1].year != copyArray[i].year) {
            let score = 0;
            console.log(moviesInYear)
            if (moviesInYear === 1) {
                score = copyArray[i].score;
            } 
            if (moviesInYear > 1) {
                score = copyArray.slice(i+1 - moviesInYear, i + 1).map(movie => movie.score).reduce((a, b) => a + b) / (moviesInYear)
                console.log("hello")
            }
            if (score > bestScore) {
                bestYear = copyArray[i].year;
                bestScore = score;
            }
            moviesInYear = 0;
        }
        moviesInYear++
    }
    return `The best year was ${bestYear} with an average score of ${bestScore}`;
}
