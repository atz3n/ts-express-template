import { Request, Response } from "express";
import { query } from "express-validator";
import { InternalError } from "../../errors/InternalError";
import { validateAuthToken } from "../../middleware/authTokenValidation";
import { validateRequest } from "../../middleware/requestValidation";
import { Greeting, IGreetingStore } from "../../storage/IGreetingStore";
import { ARouter } from "../ARouter";


export class ReadGreetingsRouter extends ARouter {
    private readonly greetingStore: IGreetingStore;


    constructor(greetingStore: IGreetingStore) {
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
                try {
                    foundGreetings = await this.greetingStore.getGreetings();
                } catch (error) {
                    console.log(error);
                    throw new InternalError();
                }

                response.send({ greetings: foundGreetings });
            }
        );
    }
}
