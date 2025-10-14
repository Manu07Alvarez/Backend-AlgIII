
import { type TLocalizedValidationError } from 'typebox/error'
import { TObject, type TSchema } from 'typebox'
import Value from 'typebox/value'
import Guard from 'typebox/guard'
import { IsKind } from 'typebox'
import { Validator } from 'typebox/compile'

function ApplyCustomError(schema: TSchema, error: TLocalizedValidationError): TLocalizedValidationError {
  const subschema = Value.Pointer.Get(schema, error.schemaPath.slice(1))! // trim '#' in URI fragment
  if (IsKind(subschema, 'Base')) {
    return { 
        schemaPath: error.schemaPath,
        message: (error.params as { errors: { message: string}[]}).errors[0].message,
        keyword: "pattern",
        params: error.params as {pattern: string},
        instancePath: error.instancePath
     }
  }
  const errorMessage = (Guard.IsObject(subschema)                   // use guard to check for `errorMessage` structures
    && Guard.HasPropertyKey(subschema, 'errorMessage') 
    && Guard.IsString(subschema.errorMessage) 
    ? subschema.errorMessage 
    : error.message);
  return { ...error, message: errorMessage }
}
/** Application Defined Value.Errors() function that supports overriding error messages with a `errorMessage` property   */
export function CustomErrors(type: Validator<{}, TObject>, schema: TSchema, value: unknown): TLocalizedValidationError[] {
    return type.Errors(value).map(error => ApplyCustomError(schema, error))
}