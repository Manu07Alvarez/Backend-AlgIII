import { TObject } from "typebox";

export default class ValidateError extends Error {
    public details:  { path?: string ,message: string}[];
    constructor(message: string, details: { path?: string,message: string}[]) {
        super(message);
        this.name = "ValidationError";
        this.details = details;
    }
}