import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";
import { ErrorMessage } from "./error-types";

export class RequestValidationError extends CustomError {
    public readonly errors: ValidationError[];

    statusCode = 400;

    constructor(errors: ValidationError[]) {
        super("Invalid request parameters");
        this.errors = errors;

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors(): ErrorMessage[] {
        return this.errors.map((err) => {
            return { message: err.msg, field: err.param };
        });
    }
}
