import request from "supertest";
import app from "../../../src/app";


it("successfully creates a greeting", async () => {
    const authToken = "testToken";
    const greeting = "Hi all :)";


    const createResponse = await request(app)
        .post("/greeting")
        .send({
            authToken,
            greeting
        })
        .expect(200);

    const id = <string> createResponse.body.id;


    const readResponse = await request(app)
        .get(`/greeting/${id}`)
        .query({
            authToken
        })
        .expect(200);

    const createdGreeting = <string> readResponse.body.greeting;
    expect(createdGreeting).toEqual(greeting);
});


it("returns 401 in case of invalid authToken", async () => {
    const authToken  = "thisIsAnInvalidToken";
    const greeting = "Hi all :)";


    await request(app)
        .post("/greeting")
        .send({
            authToken,
            greeting
        })
        .expect(401);
});


it("returns 400 in case of invalid request", async () => {
    const authToken = "testToken";
    const greeting = "Hi all :)";


    await request(app)
        .post("/greeting")
        .send({
            greeting
        })
        .expect(400);

    await request(app)
        .post("/greeting")
        .send({
            authToken
        })
        .expect(400);
});