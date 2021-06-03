import { CustomError } from "./custom-error";
import { ErrorMessage } from "./error-types";

export class InternalError extends CustomError {
    statusCode = 500;

    constructor() {
        super("Internal Server Error");

        Object.setPrototypeOf(this, InternalError.prototype);
    }

    serializeErrors(): ErrorMessage[] {
        return [{ message: "Internal Server Error" }];
    }
}
