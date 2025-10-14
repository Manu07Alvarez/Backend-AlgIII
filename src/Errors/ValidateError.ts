import { TObject } from "typebox";

export default class ValidateError extends Error {
    public details:  { message: string}[];
    constructor(message: string, details: { message: string}[]) {
        super(message);
        this.name = "ValidationError";
        this.details = details;
    }
}