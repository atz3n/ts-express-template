import { CustomError } from "./custom-error";
import { ErrorMessage } from "./error-types";

export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(): ErrorMessage[] {
        return [{ message: this.message }];
    }
}
