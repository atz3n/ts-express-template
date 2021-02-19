import { Request, Response, NextFunction } from "express";
import EnvVars from "../lib/EnvVars";


export default function validateAuthToken(request: Request, response: Response, next: NextFunction): void {
    let authToken = "";
    if (isBodyParameter(request)) {
        authToken = <string> request.body.authToken || "";
    }

    if (isQueryParameter(request)) {
        authToken = <string> request.query.authToken || "";
    }

    if (authToken !== EnvVars.AUTH_TOKEN) {
        throw response.status(401).send("Unauthorized");
    }

    next();
}

const isQueryParameter = (request: Request): boolean => {
    return request.method === "GET" || request.method === "DELETE";
};

const isBodyParameter = (request: Request): boolean => {
    return request.method === "POST" || request.method === "PATCH";
};