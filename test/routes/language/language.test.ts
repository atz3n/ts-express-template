import request from "supertest";
import { app } from "../../../src/app";
import { EnvVars } from "../../../src/lib/EnvVars";


it("successfully greets you in english", async () => {
    const name  = "Joe";
    const language = "en";


    await request(app)
        .post("/language")
        .send({
            language
        })
        .expect(200);


    const greetResponse = await request(app)
        .get("/greet")
        .query({
            name
        })
        .expect(200);


    expect(greetResponse.text).toBe(`${EnvVars.GREET_TEXT_EN} Your name is ${name}.`);
});


it("successfully greets you in german", async () => {
    const name  = "Alex";
    const language = "de";


    await request(app)
        .post("/language")
        .send({
            language
        })
        .expect(200);


    const greetResponse = await request(app)
        .get("/greet")
        .query({
            name
        })
        .expect(200);


    expect(greetResponse.text).toBe(`${EnvVars.GREET_TEXT_DE} Dein Name ist ${name}.`);
});


it("returns 400 because of unsupported language", async () => {
    const language = "pl";


     await request(app)
        .post("/language")
        .send({
            language
        })
        .expect(400);
});


it("returns 400 because of missing language", async () => {
     await request(app)
        .post("/language")
        .send()
        .expect(400);
});