import { Request, Response } from "express";
import { body } from "express-validator";
import validateAuthToken from "../../middleware/authTokenValidation";
import validateRequest from "../../middleware/requestValidation";
import { IGreetingStore } from "../../storage/IGreetingStore";
import ARouter from "../ARouter";


export default class CreateTextureRouter extends ARouter {
    private readonly greetingStore: IGreetingStore;


    constructor(greetingStore: IGreetingStore) {
        super();
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
}
