import { authRegistry } from '@/api/auth/router'
import { domainsRegistery } from '@/api/domains/router'
import { fakeIdentityRegistery } from '@/api/fake-identity/router'
import { logsRegistry } from '@/api/logs/router'
import { passwordRegistery } from '@/api/password/router'
import { randomImageRegistery } from '@/api/random-image/router'
import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi'

export const generateOpenAPIDocument = () => {
	const registry = new OpenAPIRegistry([
		authRegistry,
		logsRegistry,
		passwordRegistery,
		fakeIdentityRegistery,
		domainsRegistery,
		randomImageRegistery,
	])
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
