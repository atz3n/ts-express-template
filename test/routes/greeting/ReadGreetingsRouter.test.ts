import request from "supertest";
import app from "../../../src/app";
import { Greeting } from "../../../src/storage/IGreetingStore";


it("returns an empty array if no greeting is stored", async () => {
    const authToken  = "testToken";


    const response = await request(app)
        .get("/greetings")
        .query({ authToken })
        .expect(200);

    const foundGreetings = <Greeting[]> response.body.greetings;
    expect(foundGreetings.length).toEqual(0);
});


it("successfully returns all greetings", async () => {
    const authToken  = "testToken";
    const greetings = [
        "Hi all :)",
        "Hi everyone :)",
        "Hi people :)"
    ];

    const ids = [
        await storeGreeting(greetings[0]),
        await storeGreeting(greetings[1]),
        await storeGreeting(greetings[2])
    ];


    const response = await request(app)
        .get("/greetings")
        .query({ authToken })
        .expect(200);

    const foundGreetings = <Greeting[]> response.body.greetings;
    expect(foundGreetings.length).toEqual(greetings.length);

    for (let i = 0 ; i < foundGreetings.length ; i++) {
        expect(foundGreetings[i].greeting).toEqual(greetings[i]);
        expect(foundGreetings[i].id).toEqual(ids[i]);
    }
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