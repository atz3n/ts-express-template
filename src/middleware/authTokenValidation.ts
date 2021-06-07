import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import { EnvVars } from "../lib/EnvVars";


export function validateAuthToken(request: Request, response: Response, next: NextFunction): void {
    const authToken = <string> request.query.authToken || "";

    if (authToken !== EnvVars.AUTH_TOKEN) {
        throw new NotAuthorizedError();
    }

    next();
}