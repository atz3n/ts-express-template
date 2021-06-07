import { Request, Response } from "express";
import { body, query } from "express-validator";
import { CustomError } from "../../errors/custom-error";
import { InternalError } from "../../errors/internal-error";
import { NotFoundError } from "../../errors/not-found-error";
import { validateAuthToken } from "../../middleware/authTokenValidation";
import { validateRequest } from "../../middleware/requestValidation";
import { IGreetingStore } from "../../storage/IGreetingStore";
import { ARouter } from "../ARouter";


export class UpdateGreetingRouter extends ARouter {
    private readonly greetingStore: IGreetingStore;


    constructor(greetingStore: IGreetingStore) {
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

                try {
                    const foundGreeting = await this.greetingStore.getGreeting(id);
                    if (!foundGreeting) {
                        throw new NotFoundError();
                    }

                    await this.greetingStore.updateGreeting({ id, greeting });
                    response.send();
                } catch (error) {
                    if (error instanceof CustomError) {
                        throw error;
                    }
                    console.log(error);
                    throw new InternalError();
                }
            }
        );
    }
}