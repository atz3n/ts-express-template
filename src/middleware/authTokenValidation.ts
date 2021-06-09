import { NotAuthorizedError } from "@atz3n/express-utils";
import { NextFunction, Request, Response } from "express";
import { EnvVars } from "../lib/EnvVars";


export function validateAuthToken2(allowedToken: string): (request: Request, response: Response, next: NextFunction) => void {
    return (request: Request, response: Response, next: NextFunction) => {
        const authToken = <string> request.query.authToken || "";

        if (authToken !== allowedToken) {
            throw new NotAuthorizedError();
        }

        next();
    };
}
export function validateAuthToken(request: Request, response: Response, next: NextFunction): void {
    const authToken = <string> request.query.authToken || "";

    if (authToken !== EnvVars.AUTH_TOKEN) {
        throw new NotAuthorizedError();
    }

    next();
}