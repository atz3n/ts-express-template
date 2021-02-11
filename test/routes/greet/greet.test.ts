import request from "supertest";
import app from "../../../src/app";
import EnvVars from "../../../src/lib/EnvVars";


it("successfully greets you in english as default", async () => {
    const name  = "Joe";

    const greetResponse = await request(app)
        .get("/greet")
        .query({
            name
        })
        .expect(200);

    expect(greetResponse.text).toBe(`${EnvVars.GREET_TEXT_EN} Your name is ${name}.`);
});


it("returns 400 because of missing name", async () => {
    await request(app)
        .get("/greet")
        .expect(400);
});