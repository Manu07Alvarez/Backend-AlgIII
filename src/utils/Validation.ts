


import { UsuarioSchema } from "schemas/Usuarios.schema.js"
import { CarreraSchema } from "schemas/Carreras.schemas.js"
import { TemaSchema } from "schemas/Tema.schema.js"
import { PostSchema } from "schemas/Post.schemas.js"
import { MensajeSchema } from "schemas/Mensajes.schemas.js"
import Ajv from "ajv";
const ajv = new Ajv.default({allErrors: true, strict: false});
ajv.addSchema(UsuarioSchema, "usuario")
ajv.addSchema(CarreraSchema, "carrera")
ajv.addSchema(TemaSchema, "tema")
ajv.addSchema(PostSchema, "post")
ajv.addSchema(MensajeSchema, "mensaje")
