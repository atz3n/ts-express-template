import { Request, Response } from "express";
import { body, query } from "express-validator";
import { InternalError } from "../../errors/InternalError";
import { NotFoundError } from "../../errors/notFoundError";
import { validateAuthToken } from "../../middleware/authTokenValidation";
import { validateRequest } from "../../middleware/requestValidation";
import { IGreetingStore } from "../../storage/IGreetingStore";
import { ARouter } from "../ARouter";


export class UpdateGreetingRouter extends ARouter {
    private readonly greetingStore: IGreetingStore;


    constructor(greetingStore: IGreetingStore) {
        super();
        this.greetingStore = greetingStore;
        this.createRoute();
    }

    private createRoute(): void {
        this.router.patch("/greeting/:id",
            [
                query("authToken").notEmpty(),
                query("authToken").isString(),
                body("greeting").notEmpty(),
                body("greeting").isString()
            ],
            validateRequest,
            validateAuthToken,
            async (request: Request, response: Response) => {
                const id = <string> request.params.id;
                const greeting = <string> request.body.greeting;


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


                try {
                    await this.greetingStore.updateGreeting({ id, greeting });
                } catch (error) {
                    console.log(error);
                    throw new InternalError();
                }

                response.send();
            }
        );
    }
}
