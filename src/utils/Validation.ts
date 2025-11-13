import { UserLoginSchema, UsuarioSchema } from "../schemas/Usuarios.schema.js"
import { CarreraSchema } from "../schemas/Carreras.schemas.js"
import { TemaSchema } from "../schemas/Tema.schema.js"
import { PostSchema } from "../schemas/Post.schemas.js"
import { MensajeSchema } from "../schemas/Mensajes.schemas.js"
import { NotificacionSchema } from "../schemas/Notificacion.schemas.js"
import { ReporteSchema} from "../schemas/Reportes.schemas.js"
import { CurriculumSchema } from "schemas/Curriculum.schemas.js"
import { Compile } from 'typebox/compile' 

export const login_validator = Compile(UserLoginSchema)
export const user_validator = Compile(UsuarioSchema)
export const carrera_validator = Compile(CarreraSchema)
export const tema_validator = Compile(TemaSchema)
export const post_validator = Compile(PostSchema)
export const mensaje_validator = Compile(MensajeSchema)
export const Notificacion_validator = Compile(NotificacionSchema)
export const reporte_validator = Compile(ReporteSchema)
export const curriculum_validator = Compile(CurriculumSchema)