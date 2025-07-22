import Ajv from "ajv";
import addFormat from "ajv-formats";
import { TSchema } from "@sinclair/typebox";

const ajv = new Ajv.default({allErrors: true, strict: false});
addFormat.default(ajv);
// ...existing code...
export const validateSchema = async (schema: string, data: unknown) => {
    const validate = ajv.getSchema(schema);
    let valid = false;
    let errors: any[] = [];

    if (typeof validate === "function") {
        const result = validate(data);
        if (result instanceof Promise) {
            try {
                await result;
                valid = true;
            } catch (e) {
                valid = false;
            }
        } else {
            valid = result;
        }
        errors = validate.errors || [];
    }

    return {
        valid,
        errors,
    };
}
// ...existing code...