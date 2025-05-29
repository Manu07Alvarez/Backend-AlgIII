
import swaggerAutogen from 'swagger-autogen';

const doc = {
	info: {
			version: 'v1.0.0',
			title: 'Swagger Demo Project',
			description: 'Implementation of Swagger with TypeScript'
	},
	servers: [
			{
					url: 'http://localhost:8000',
					description: ''
			},
	],
	components: {
		schemas: {
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