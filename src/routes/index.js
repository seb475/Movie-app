const express = require('express');
const actorRouter = require('./actor.routes');
const directorRouter = require('./director.routes');
const genreRouter = require('./genre.routes');
const movieRouter = require('./movie.routes');
const router = express.Router();

// colocar las rutas aquí
router.use("/genres",genreRouter)
router.use("/actors",actorRouter)
router.use("/directors",directorRouter)
router.use("/movies",movieRouter)

module.exports = router;



