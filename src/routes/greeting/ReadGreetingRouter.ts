import { InternalError, NotFoundError, validateAuthToken, validateRequest } from "@atz3n/express-utils";
import { Request, Response } from "express";
import { query } from "express-validator";
import { EnvVars } from "../../lib/EnvVars";
import { IGreetingStore } from "../../storage/IGreetingStore";
import { ARouter } from "../ARouter";


export class ReadGreetingRouter extends ARouter {
    private readonly greetingStore: IGreetingStore;


    constructor(greetingStore: IGreetingStore) {
        super();
        this.greetingStore = greetingStore;
        this.createRoute();
    }

    private createRoute(): void {
        this.router.get("/greeting/:id",
            [
                query("authToken").notEmpty(),
                query("authToken").isString(),
            ],
            validateRequest,
            validateAuthToken(EnvVars.AUTH_TOKEN),
            async (request: Request, response: Response) => {
                const id = <string> request.params.id;


                let foundGreeting: string | undefined;
                try {
                    foundGreeting = await this.greetingStore.getGreeting(id);
                } catch (error) {
                    console.log(error);
                    throw new InternalError();
                }

                if (!foundGreeting) {
                    throw new NotFoundError();
                }

                response.send({ greeting: foundGreeting });
            }
        );
    }
}
