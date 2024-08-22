import { SwaggerOptions } from 'swagger-jsdoc';

export const swaggerOptions: SwaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Blackstone Challenge API',
			version: '1.0.0',
			description:
				'This is Blackstone Challenge REST API application made with Express and TypeScript',
		},
		servers: [
			{
				url: 'http://localhost:3000/',
			},
		],
	},
	apis: [
		'app/backend/src/api/index.routes.ts',
		'app/backend/src/api/user/user.routes.ts',
		'app/backend/src/api/note/note.routes.ts',
		'app/backend/src/api/login/login.router.ts',
	], // Path to your API route files
};
// app/backend/src/documentation/swaggerConfig.ts
