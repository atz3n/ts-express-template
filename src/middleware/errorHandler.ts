import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";


export const errorHandler = (error: Error, request: Request, response: Response, _next: NextFunction): any => {
    if (error instanceof CustomError) {
        return response.status(response.statusCode).send({ errors: error.serializeErrors() });
    }

    return response.status(400).send({
        errors: [{ message: "Something went wrong" }],
    });
};
