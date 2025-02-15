import { authRegistry } from '@/api/auth/router'
import { crawlerRegistery } from '@/api/crawler/router'
import { ddosRegistery } from '@/api/ddos/router'
import { domainsRegistery } from '@/api/domains/router'
import { fakeIdentityRegistery } from '@/api/fake-identity/router'
import { logsRegistry } from '@/api/logs/router'
import { passwordRegistery } from '@/api/password/router'
import { randomImageRegistery } from '@/api/random-image/router'
import { spamEmailRegistery } from '@/api/spam-email/router'
import { usersRegistery } from '@/api/users/router'
import { verifEmailRegistery } from '@/api/verif-email/router'
import { verifPasswordRegistery } from '@/api/verif-password/router'
import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi'

export const generateOpenAPIDocument = () => {
	const registry = new OpenAPIRegistry([
		authRegistry,
		logsRegistry,
		passwordRegistery,
		fakeIdentityRegistery,
		domainsRegistery,
		randomImageRegistery,
		verifEmailRegistery,
		verifPasswordRegistery,
		ddosRegistery,
		spamEmailRegistery,
		crawlerRegistery,
		usersRegistery,
	])

	const generator = new OpenApiGeneratorV3(registry.definitions)

	const document = generator.generateDocument({
		openapi: '3.0.0',
		info: {
			version: '1.0.0',
			title: 'Swagger API',
		},
		security: [{ bearerAuth: [] }],
		externalDocs: {
			description: 'View the raw OpenAPI Specification in JSON format',
			url: '/swagger.json',
		},
	})

	return {
		...document,
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
	}
}
