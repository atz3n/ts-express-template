import express, { Request, Response } from "express";
import { query } from "express-validator";
import LanguageStore from "../../lib/LanguageStore";
import validateRequest from "../../middleware/requestValidation";
import Greeter from "../../service/Greeter";


const router = express.Router();

router.get("/greet",
    [
        query("name").notEmpty().withMessage("name required"),
        query("name").isString().withMessage("name must be a string")
    ],
    validateRequest,
    (request: Request, response: Response) => {
        const name = <string> request.query.name;
        const greeter = new Greeter(name);

        response.send(greeter.greet(LanguageStore.language));
    }
);


export { router as greetRouter };
