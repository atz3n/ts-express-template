import { CustomError } from "./custom-error";
import { ErrorMessage } from "./error-types";

export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super("Not Authorized");

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors(): ErrorMessage[] {
        return [{ message: "Not authorized" }];
    }
}
