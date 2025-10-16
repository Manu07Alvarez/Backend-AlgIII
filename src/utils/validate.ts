
import { Validator } from "typebox/compile";
import ValidateError from "../Errors/ValidateError.js";
import { TObject, TSchema } from "typebox"
import { CustomErrors } from "../Errors/TypeCustomError.js";


export const validateSchema = (schema_compiled: Validator<{}, TObject>, schema: TSchema, data: unknown) => {
    let errors_array: {path: string, message: string}[] = [];
    try { 
        if (!schema_compiled.Check(data)) {
            
            //FIXME: pass fields errors as object to error handler.
            const errors = CustomErrors(schema_compiled, schema, data);
            errors.forEach(error => {
                errors_array.push({path: `field ${error.instancePath.slice(1)}:`, message: error.message});
            })
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new ValidateError(error.message, [{path: "", message: error.message}]);
        }
        throw error;
    }
};