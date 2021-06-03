import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import EnvVars from "../lib/EnvVars";


export default function validateAuthToken(request: Request, response: Response, next: NextFunction): void {
    const authToken = <string> request.query.authToken || "";

    if (authToken !== EnvVars.AUTH_TOKEN) {
        console.log("HHELL");
        throw new NotAuthorizedError();
    }

    next();
}