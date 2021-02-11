import request from "supertest";
import app from "../../../src/app";
import EnvVars from "../../../src/lib/EnvVars";


it("successfully greets you", async () => {
    const name  = "Joe";

    const greetResponse = await request(app)
        .get("/greet")
        .query({
            name
        })
        .expect(200);

    expect(greetResponse.text).toBe(`${EnvVars.GREET_TEXT_EN} Your name is ${name}.`);
});


// it("successfully greets you in german", async () => {
//     const language = "de";
//     const name  = "Alex";

//     const greetResponse = await request(app)
//         .get("/greet")
//         .send({
//             name,
//             language
//         })
//         .expect(200);

//     expect(greetResponse.body).toBe(`${EnvVars.GREET_TEXT_DE} Dein Name ist ${name}.`);
// });


// it("successfully greets you in english as default", async () => {
//     const name  = "Joe";

//     const greetResponse = await request(app)
//         .get("/greet")
//         .send({
//             name
//         })
//         .expect(200);

//     expect(greetResponse.body).toBe(`${EnvVars.GREET_TEXT_DE} Dein Name ist ${name}.`);
// });


// it("returns 400 because of a wrong name type", async () => {
//     const name = 0;
//     await request(app)
//         .get("/greet")
//         .query({
//             name
//         })
//         .expect(400);
// });


it("returns 400 because of missing name", async () => {
    await request(app)
        .get("/greet")
        .expect(400);
});


// it("returns 400 because of unsupported language", async () => {
//     const language = "pl";
//     const name  = "Stanislav";

//     await request(app)
//         .get("/greet")
//         .send({
//             name,
//             language
//         })
//         .expect(400);
// });