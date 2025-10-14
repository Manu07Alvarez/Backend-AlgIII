import { UserLoginSchema, UsuarioSchema } from "../schemas/Usuarios.schema.js"
import { CarreraSchema } from "../schemas/Carreras.schemas.js"
import { TemaSchema } from "../schemas/Tema.schema.js"
import { PostSchema } from "../schemas/Post.schemas.js"
import { MensajeSchema } from "../schemas/Mensajes.schemas.js"
import { Compile } from 'typebox/compile' 
export const login_validator = Compile(UserLoginSchema)
export const user_validator = Compile(UsuarioSchema)
export const carrera_validator = Compile(CarreraSchema)
export const tema_validator = Compile(TemaSchema)
export const post_validator = Compile(PostSchema)
export const mensaje_validator = Compile(MensajeSchema)