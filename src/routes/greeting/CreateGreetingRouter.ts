import express, { Request, Response, Router } from "express";
import { body } from "express-validator";
import validateAuthToken from "../../middleware/authTokenValidation";
import validateRequest from "../../middleware/requestValidation";
import { IGreetingStore } from "../../storage/IGreetingStore";


export default class CreateTextureRouter {
    private readonly router = express.Router();
    private readonly greetingStore: IGreetingStore;


    constructor(greetingStore: IGreetingStore) {
        this.greetingStore = greetingStore;
        this.createRoute();
    }

    private createRoute(): void {
        this.router.post(
            "/greeting",
            [
                body("authToken").notEmpty(),
                body("authToken").isString(),
                body("greeting").notEmpty(),
                body("greeting").isString()
            ],
            validateRequest,
            validateAuthToken,
            async (request: Request, response: Response) => {
                const greeting = <string> request.body.greeting;

                try {
                    const id = await this.greetingStore.storeGreeting(greeting);
                    response.send({ id });
                } catch (error) {
                    console.log(error);
                    response.status(500).send("Internal Server Error");
                }
            }
        );
    }


    public getRouter(): Router {
        return this.router;
    }
}
