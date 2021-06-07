import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../../errors/BadRequestError";
import { LanguageStore } from "../../lib/LanguageStore";
import { validateRequest } from "../../middleware/requestValidation";


const router = express.Router();

router.post("/language",
    [
        body("language").notEmpty().withMessage("language required"),
        body("language").isString().withMessage("language must be a string")
    ],
    validateRequest,
    (request: Request, response: Response) => {
        const language = <string> request.body.language || "en";


        if (!checkLanguage(language)) {
            throw new BadRequestError("Language not supported");
        }


        LanguageStore.language = language;
        response.send(`Language set to ${LanguageStore.language}`);
    }
);

function checkLanguage(language: string): boolean {
    return language.toLowerCase() === "en" || language.toLowerCase() === "de";
}


export { router as languageRoute };
