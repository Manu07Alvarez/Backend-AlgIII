
import { UsuarioSchema } from '../schemas/Usuarios.schema.js';
import { CarreraSchema } from '../schemas/Carreras.schemas.js';
import swaggerAutogen from 'swagger-autogen';
import { TemaSchema } from '../schemas/Tema.schema.js';
import { PostSchema } from '../schemas/Post.schemas.js';
import { MensajeSchema } from '../schemas/Mensajes.schemas.js';
import { ReporteSchema } from '../schemas/Reportes.schemas.js';
import { CurriculumSchema } from '../schemas/Curriculum.schemas.js';	


const doc = {
	info: {
			version: 'v1.0.0',
			title: 'Swagger Demo Project',
			description: 'Implementation of Swagger with TypeScript'
	},
	servers: [
			{
				description: ''
			},
	],
	components: {
		securitySchemes: {
			cookieAuth: { 
				type: 'apiKey',
				in: 'cookie',
				name: 'auth_token',
			}
		},
		schemas: {
				carreraSchema: CarreraSchema,
				usuarioSchema: UsuarioSchema,
				reportSchema: ReporteSchema,
				temaSchema: TemaSchema,
				postSchema: PostSchema,
				curriculumSchema: CurriculumSchema,
				mensajeSchema: MensajeSchema,
				registerSchema: {
						$email: 'fulanchoΩ@example.com',
						$nombre_apellido: 'fula',
						$contrasenia: '4123@examplE'
				},
				loginSchema: {
						$email: 'fulanchoΩ@example.com',
						$contrasenia: '4123@examplE'
				}
		},
	},
	security: [
		{
			cookieAuth: [],
		},
	],
}



const outputFile = './swagger-generated.json';
const endpointsFiles = ['src/routes/index.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);