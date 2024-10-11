import { authRegistry } from '@/api/auth/router'
import { userRegistry } from '@/api/user/userRouter'
import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi'

export const generateOpenAPIDocument = () => {
	const registry = new OpenAPIRegistry([userRegistry, authRegistry])
	const generator = new OpenApiGeneratorV3(registry.definitions)

	return generator.generateDocument({
		openapi: '3.0.0',
		info: {
			version: '1.0.0',
			title: 'Swagger API',
		},
		externalDocs: {
			description: 'View the raw OpenAPI Specification in JSON format',
			url: '/swagger.json',
		},
	})
}
