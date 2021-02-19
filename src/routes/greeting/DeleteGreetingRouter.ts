import express, { Request, Response, Router } from "express";
import { query } from "express-validator";
import validateAuthToken from "../../middleware/authTokenValidation";
import validateRequest from "../../middleware/requestValidation";
import { IGreetingStore } from "../../storage/IGreetingStore";


export default class DeleteGreetingRouter {
    private readonly router = express.Router();
    private readonly greetingStore: IGreetingStore;


    constructor(greetingStore: IGreetingStore) {
        this.greetingStore = greetingStore;
        this.createRoute();
    }

    private createRoute(): void {
        this.router.delete(
            "/greeting/:id",
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
                        return response.status(404).send("Not Found");
                    }

                    await this.greetingStore.deleteGreeting(id);
                    response.send();
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
