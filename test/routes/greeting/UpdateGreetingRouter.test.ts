import request from "supertest";
import app from "../../../src/app";


it("successfully updates a greeting", async () => {
    const authToken  = "testToken";
    const greeting = "Hi all :)";
    const updatedGreeting = "Hi everyone :)";

    const id = await storeGreeting(greeting);


    await request(app)
        .patch(`/greeting/${id}`)
        .query({ authToken })
        .send({ greeting: updatedGreeting })
        .expect(200);


    const readResponse = await request(app)
        .get(`/greeting/${id}`)
        .query({ authToken })
        .expect(200);

    const foundUpdatedGreeting = <string> readResponse.body.greeting;
    expect(foundUpdatedGreeting).toEqual(updatedGreeting);
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


it("returns 404 in case of not found greeting", async () => {
    const authToken  = "testToken";
    const greeting = "Hi all :)";

    await request(app)
        .patch("/greeting/42")
        .query({ authToken })
        .send({ greeting })
        .expect(404);
});