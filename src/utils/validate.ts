
import { Validator } from "typebox/compile";
import ValidateError from "../Errors/ValidateError.js";
import { TObject } from "typebox"


export const validateSchema = (schema_compiled: Validator<{}, TObject>, data: unknown) => {
    try { 
        if (!schema_compiled.Check(data)) {
            schema_compiled.Errors(data).forEach((error) => {
                console.error(`Validation error in fields ${schema_compiled.Errors(data).map((error) => error.instancePath)}:`, error.params);
            });
            //FIXME: pass fields errors as object to error handler.
            const errors = (schema_compiled.Errors(data).map((error) => error.params) as unknown) as { errors: [{ message: string}]};
            for (const error of errors) {
                error.errors.forEach((error) => {
                    console.error(`Validation error in fields ${schema_compiled.Errors(data).map((error) => error.instancePath)}:`, error.message);
                });
            }
            throw new ValidateError("Invalid data", errors.map((error) => error.errors[0]));
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new ValidateError(error.message, []);
        }
        throw error;
    }
};