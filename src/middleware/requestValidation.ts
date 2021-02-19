import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";


export default function validateRequest(request: Request, response: Response, next: NextFunction): void {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        throw response.status(400).send("Bad Request");
    }

    next();
}