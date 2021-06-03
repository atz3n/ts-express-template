import { CustomError } from "./custom-error";
import { ErrorMessage } from "./error-types";

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super("Route not found");

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(): ErrorMessage[] {
        return [{ message: "Not Found" }];
    }
}
