import { InternalError, NotFoundError, validateRequest } from "@atz3n/express-utils";
import { Request, Response } from "express";
import { query } from "express-validator";
import { validateAuthToken } from "../../middleware/authTokenValidation";
import { IGreetingStore } from "../../storage/IGreetingStore";
import { ARouter } from "../ARouter";


export class DeleteGreetingRouter extends ARouter {
    private readonly greetingStore: IGreetingStore;


    constructor(greetingStore: IGreetingStore) {
        super();
        this.greetingStore = greetingStore;
        this.createRoute();
    }

    private createRoute(): void {
        this.router.delete("/greeting/:id",
            [
                query("authToken").notEmpty(),
                query("authToken").isString(),
            ],
            validateRequest,
            validateAuthToken,
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


                try {
                    await this.greetingStore.deleteGreeting(id);
                } catch (error) {
                    console.log(error);
                    throw new InternalError();
                }

                response.send();
            }
        );
    }
}
