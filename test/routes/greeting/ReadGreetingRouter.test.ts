import request from "supertest";
import { app } from "../../../src/app";


it("successfully returns a greeting", async () => {
    const authToken  = "testToken";
    const greeting1 = "Hi all :)";
    const greeting2 = "Hi everyone :)";

    const id1 = await storeGreeting(greeting1);
    const id2 = await storeGreeting(greeting2);


    let response;
    let greeting;

    response = await request(app)
        .get(`/greeting/${id1}`)
        .query({ authToken })
        .expect(200);

    greeting = <string> response.body.greeting;
    expect(greeting).toEqual(greeting1);


    response = await request(app)
        .get(`/greeting/${id2}`)
        .query({ authToken })
        .expect(200);

        greeting = <string> response.body.greeting;
        expect(greeting).toEqual(greeting2);
    });

    const storeGreeting = async (greeting: string): Promise<string> => {
        const authToken  = "testToken";


        const response = await request(app)
            .post("/greeting")
            .query({ authToken })
            .send({ greeting })
            .expect(200);

    const id = <string> response.body.id;
    return id;
};


it("returns 400 in case of invalid request", async () => {
    await request(app)
        .get("/greeting/42")
        .expect(400);
});


it("returns 401 in case of invalid authToken", async () => {
    const authToken  = "thisIsAnInvalidToken";


    await request(app)
        .get("/greeting/42")
        .query({ authToken })
        .expect(401);
});


it("returns 404 in case of not found greeting", async () => {
    const authToken  = "testToken";


    await request(app)
        .post("/greeting/42")
        .query({ authToken })
        .expect(404);
});