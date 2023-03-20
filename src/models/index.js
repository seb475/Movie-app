const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Movie.belongsToMany(Actor, {through: "MoviesAactors"})
Actor.belongsToMany(Movie, {through: "MoviesAactors"})

Movie.belongsToMany(Director, {through: "MoviesDirectors"})
Director.belongsToMany(Movie, {through: "MoviesDirectors"})

Movie.belongsToMany(Genre, {through: "MoviesGenres"})
Genre.belongsToMany(Movie, {through: "MoviesGenres" })