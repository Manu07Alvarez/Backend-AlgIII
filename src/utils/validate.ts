import Ajv from "ajv";
import addFormat from "ajv-formats";
import { TSchema } from "@sinclair/typebox";

const ajv = new Ajv.default({allErrors: true, strict: false});
addFormat.default(ajv);

export const validateSchema = (schema: TSchema, data: unknown) => {
    const validate = ajv.compile(schema);
    const valid = validate(data);

    return {
        valid,
        errors: validate.errors || [],
    };
};