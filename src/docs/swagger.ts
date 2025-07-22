
import { UsuarioSchema } from '../schemas/Usuarios.schema.js';
import { CarreraSchema } from '../schemas/Carreras.schemas.js';
import swaggerAutogen from 'swagger-autogen';
import { TemaSchema } from '../schemas/Tema.schema.js';
import { PostSchema } from '../schemas/Post.schemas.js';
import { MensajeSchema } from '../schemas/Mensajes.schemas.js';


const doc = {
	info: {
			version: 'v1.0.0',
			title: 'Swagger Demo Project',
			description: 'Implementation of Swagger with TypeScript'
	},
	servers: [
			{
					url: 'http://localhost:5000',
					description: ''
			},
	],
	components: {
		schemas: {
				carreraSchema: CarreraSchema,
				usuarioSchema: UsuarioSchema,
				temaSchema: TemaSchema,
				postSchema: PostSchema,
				mensajeSchema: MensajeSchema,
				securitySchema: {
					cookieAuth: { 
						type: 'apiKey',
						in: 'cookie',
						name: 'token',
					}
				},
				registerSchema: {
						$email: 'fulanchoΩ@example.com',
						$nombre: 'fula',
						$contraseña: '4123'
				},
				loginSchema: {
						$email: 'fulanchoΩ@example.com',
						$contraseña: '4123'
				}
		},
	}
}



const outputFile = './swagger-generated.json';
const endpointsFiles = ['src/routes/index.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);