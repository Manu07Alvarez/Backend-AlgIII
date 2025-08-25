import Ajv from "ajv";
import addFormat from "ajv-formats";
//FIX: cambiar uso de creacion de instancia de ajv a un compilador.
const ajv = new Ajv.default({allErrors: true, strict: false});
addFormat.default(ajv);



export const validateSchema = <T>(schema: "string", data: unknown) => {

    const validate = ajv.getSchema<T>(schema);
    if (!validate) {
        throw new Error(`Schema ${schema} not found`);
    }
    if (!validate(data)) {
        validate.errors?.forEach((error) => {
            console.error(`Validation error in schema ${schema}:`, error);
        });
        throw new Error(`Validation failed for schema ${schema}`);
    }
    return data;
};