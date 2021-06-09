import { InternalError, validateRequest } from "@atz3n/express-utils";
import { Request, Response } from "express";
import { query } from "express-validator";
import { validateAuthToken } from "../../middleware/authTokenValidation";
import { Greeting, IGreetingStore } from "../../storage/IGreetingStore";
import { ARouter } from "../ARouter";


export class ReadGreetingsRouter extends ARouter {
    private readonly greetingStore: IGreetingStore;


    constructor(greetingStore: IGreetingStore) {
        super();
        this.greetingStore = greetingStore;
        this.createRoute();
    }

    private createRoute(): void {
        this.router.get("/greetings",
            [
                query("authToken").notEmpty(),
                query("authToken").isString(),
            ],
            validateRequest,
            validateAuthToken,
            async (request: Request, response: Response) => {
                let foundGreetings: Greeting[];
                try {
                    foundGreetings = await this.greetingStore.getGreetings();
                } catch (error) {
                    console.log(error);
                    throw new InternalError();
                }

                response.send({ greetings: foundGreetings });
            }
        );
    }
}
