import express, { Request, Response } from "express";
import { query } from "express-validator";
import LanguageStore from "../../lib/LanguageStore";
import validateRequest from "../../middleware/requestValidation";
import Greeter from "../../service/Greeter";


const router = express.Router();

router.get(
    "/greet",
    [
        query("name").notEmpty().withMessage("name required"),
        query("name").isString().withMessage("name must be a string")
    ],
    validateRequest,
    (request: Request, response: Response) => {
        const name = <string> request.query.name;
        // const language = <string> req.query.language || "en";

        // if (!checkLanguage(language)) {
        //     return res.status(400).send("Language not supported");
        // }

        const greeter = new Greeter(name);
        return response.send(greeter.greet(LanguageStore.language));
    }
);

// function checkLanguage(language: string): boolean {
//     return language.toLowerCase() === "en" || language.toLowerCase() === "de";
// }


export { router as greetRouter };
