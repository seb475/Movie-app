const request = require("supertest")
const app = require("../app")
require("../models")

let actorId

test("POST /actors shoould create one actor", async() => {
    const newActor = {
        firstName: "sebastian  ",
        lastName: "Pedraza Acevedo",
        nationality: "Mexican",
        image: "http sebatian image",
        birthday: "2001-012-12"
    }
    const res = await request(app).post("/actors").send(newActor)
    actorId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(newActor.firstName)
})
test("GET /actors should return all actors", async() => {
    const res = await request(app).get("/actors")
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})
test("PUT /actors/:id should update one actor ", async() => {
    const body = {
        firstName: "sebastian Update "
    }
    const res = await request(app)
    .put(`/actors/${actorId}`)
    .send(body)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(body.firstName)
})
test("DELETE /actors/:id should delete one actor", async() => {
    const res = await request(app).delete(`/actors/${actorId}`)
    expect(res.status).toBe(204)
})