import express, { Request, Response, Router } from "express";
import { query } from "express-validator";
import validateAuthToken from "../../middleware/authTokenValidation";
import validateRequest from "../../middleware/requestValidation";
import { IGreetingStore } from "../../storage/IGreetingStore";


export default class ReadGreetingsRouter {
    private readonly router = express.Router();
    private readonly greetingStore: IGreetingStore;


    constructor(greetingStore: IGreetingStore) {
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


    public getRouter(): Router {
        return this.router;
    }
}
