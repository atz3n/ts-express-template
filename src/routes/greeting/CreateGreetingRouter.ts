import { Request, Response } from "express";
import { body, query } from "express-validator";
import { InternalError } from "../../errors/internal-error";
import { validateAuthToken } from "../../middleware/authTokenValidation";
import { validateRequest } from "../../middleware/requestValidation";
import { IGreetingStore } from "../../storage/IGreetingStore";
import { ARouter } from "../ARouter";


export class CreateGreetingRouter extends ARouter {
    private readonly greetingStore: IGreetingStore;


    constructor(greetingStore: IGreetingStore) {
        super();
        this.greetingStore = greetingStore;
        this.createRoute();
    }

    private createRoute(): void {
        this.router.post("/greeting",
            [
                query("authToken").notEmpty(),
                query("authToken").isString(),
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
                    throw new InternalError();
                }
            }
        );
    }
}
