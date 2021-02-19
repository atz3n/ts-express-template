import request from "supertest";
import app from "../../../src/app";


it("successfully deletes a greeting", async () => {
    const authToken = "testToken";
    const greeting = "Hi all :)";

    const id = await storeGreeting(greeting);


    await request(app)
        .delete(`/greeting/${id}`)
        .query({
            authToken
        })
        .expect(200);


    await request(app)
        .get(`/greeting/${id}`)
        .query({
            authToken
        })
        .expect(404);
});

const storeGreeting = async (greeting: string): Promise<string> => {
    const authToken = "testToken";

    const response = await request(app)
        .post("/greeting")
        .send({
            authToken,
            greeting
        })
        .expect(200);

    const id = <string> response.body.id;
    return id;
};


it("returns 404 in case of not found greeting", async () => {
    const authToken = "testToken";


    await request(app)
        .delete("/greeting/42")
        .query({
            authToken
        })
        .expect(404);
});