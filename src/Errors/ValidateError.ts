import { ErrorObject } from 'ajv';
export default class ValidateError extends Error {
    public details:  ErrorObject[];
    constructor(message: string, details: ErrorObject[]) {
        super(message);
        this.name = "ValidationError";
        this.details = details;
    }
}