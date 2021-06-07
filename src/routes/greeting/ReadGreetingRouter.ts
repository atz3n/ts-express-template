import { Request, Response } from "express";
import { query } from "express-validator";
import { CustomError } from "../../errors/CustomError";
import { InternalError } from "../../errors/InternalError";
import { NotFoundError } from "../../errors/notFoundError";
import { validateAuthToken } from "../../middleware/authTokenValidation";
import { validateRequest } from "../../middleware/requestValidation";
import { IGreetingStore } from "../../storage/IGreetingStore";
import { ARouter } from "../ARouter";


export class ReadGreetingRouter extends ARouter {
    private readonly greetingStore: IGreetingStore;


    constructor(greetingStore: IGreetingStore) {
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
            validateAuthToken,
            async (request: Request, response: Response) => {
                const id = <string> request.params.id;

                try {
                    const foundGreeting = await this.greetingStore.getGreeting(id);
                    if (!foundGreeting) {
                        throw new NotFoundError();
                    }
                    response.send({ greeting: foundGreeting });
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
