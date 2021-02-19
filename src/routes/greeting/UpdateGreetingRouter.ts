import { Request, Response } from "express";
import { body } from "express-validator";
import validateAuthToken from "../../middleware/authTokenValidation";
import validateRequest from "../../middleware/requestValidation";
import { IGreetingStore } from "../../storage/IGreetingStore";
import ARouter from "../ARouter";


export default class UpdateGreetingRouter extends ARouter {
    private readonly greetingStore: IGreetingStore;


    constructor(greetingStore: IGreetingStore) {
        super();
        this.greetingStore = greetingStore;
        this.createRoute();
    }

    private createRoute(): void {
        this.router.patch(
            "/greeting/:id",
            [
                body("authToken").notEmpty(),
                body("authToken").isString(),
                body("greeting").notEmpty(),
                body("greeting").isString()
            ],
            validateRequest,
            validateAuthToken,
            async (request: Request, response: Response) => {
                const id = <string> request.params.id;
                const greeting = <string> request.body.greeting;

                try {
                    const foundGreeting = await this.greetingStore.getGreeting(id);
                    if (!foundGreeting) {
                        return response.status(404).send("Not Found");
                    }

                    await this.greetingStore.updateGreeting({ id, greeting });
                    response.send();
                } catch (error) {
                    console.log(error);
                    response.status(500).send("Internal Server Error");
                }
            }
        );
    }
}
