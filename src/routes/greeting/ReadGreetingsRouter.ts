import { Request, Response } from "express";
import { query } from "express-validator";
import validateAuthToken from "../../middleware/authTokenValidation";
import validateRequest from "../../middleware/requestValidation";
import { IGreetingStore } from "../../storage/IGreetingStore";
import ARouter from "../ARouter";


export default class ReadGreetingsRouter extends ARouter {
    private readonly greetingStore: IGreetingStore;


    constructor(greetingStore: IGreetingStore) {
        super();
        this.greetingStore = greetingStore;
        this.createRoute();
    }

    private createRoute(): void {
        this.router.get(
            "/greetings",
            [
                query("authToken").notEmpty(),
                query("authToken").isString(),
            ],
            validateRequest,
            validateAuthToken,
            async (request: Request, response: Response) => {
                try {
                    const foundGreetings = await this.greetingStore.getGreetings();
                    response.send({ greetings: foundGreetings });
                } catch (error) {
                    console.log(error);
                    response.status(500).send("Internal Server Error");
                }
            }
        );
    }
}
