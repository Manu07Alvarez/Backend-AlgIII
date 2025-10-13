
import ValidateError from "../Errors/ValidateError.js";
import { ajv } from "./Validation.js";

export const validateSchema = <T>(schema: string, data: unknown) => {

    try { 
        const validate = ajv.getSchema<T>(schema);
        if (!validate) {
            throw new Error(`Schema ${schema} not found`);
        }
        if (!validate(data)) {
            validate.errors?.forEach((error) => {
                console.error(`Validation error in schema ${schema}:`, error);
            });
            throw new ValidateError("Invalid data", validate.errors || []);
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new ValidateError(error.message, []);
        }
        throw error;
    }
};