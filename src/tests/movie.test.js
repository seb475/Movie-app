const request = require("supertest")
const app = require("../app")
const Actor = require("../models/Actor")
const Director = require("../models/Director")
const Genre = require("../models/Genre")
require("../models")

let movieId

test("POST /movies should create one movie", async() => {
    const newMovie = {
        name: "Kick-Ass",
        image: "http image movie",
        synopsis: "Dave un estudiante de instituto aficionado a los cómics y que siempre pasa desapercibido, decide un día convertirse en superhéroe aunque no tenga superpoderes, no haya seguido un duro entrenamiento y ni siquiera tenga una significativa razón para ello.",
        releaseYear: "2010-06-18"
    }
    const res = await request(app).post("/movies").send(newMovie)
    movieId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(newMovie.name)
})
test("GET /movies should return all movies", async() => {
    const res = await request(app).get("/movies")
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})
test("PUT /movies/:id should update one movie", async() => {
    const body = {
        name: "Kick-Ass update"
    }
    const res = await request(app)
    .put(`/movies/${movieId}`)
    .send(body)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(body.name)
})

test("POST /movies/:id/actors should set the movie genre", async() => {
    const actor = await Actor.create({
        firstName: "sebastian  ",
        lastName: "Pedraza Acevedo",
        nationality: "Mexican",
        image: "http sebatian image",
        birthday: "2001-012-12"
    })
    const res = await request(app)
    .post(`/movies/${movieId}/actors`)
    .send([actor.id])
    await actor.destroy()
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

})

test("POST /movies/:id/directors should set the movie director ", async() => {
    const director = await Director.create({
        firstName: "mario ",
    lastName: "bross ",
    nationality: "American",
    image: "http image actor",
    birthday: "1987-07-11"
    })
    const res = await request(app)
    .post(`/movies/${movieId}/directors`)
    .send([director.id])
    await director.destroy()
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("POST /movies/:id/genres should set the movie genre", async() => {
    const genre = await Genre.create({
        name: "war"
    })
    const res = await request(app)
    .post(`/movies/${movieId}/genres`)
    .send([genre.id])
    await genre.destroy()
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("DELETE /movies/:id should delete one movie", async() => {
    const res = await request(app).delete(`/movies/${movieId}`)
    expect(res.status).toBe(204)
})

