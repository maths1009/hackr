import express, { type Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { registerPath } from '@/api-docs/openAPIRegister'
import { createApiResponses } from '@/api-docs/openAPIResponseBuilders'
import { ROUTE } from '@/common/helpers/route'
import requestLogger from '@/common/middleware/requestLogger'
import { validateRequest } from '@/common/utils/httpHandlers'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { domainsController } from './controller'
import { PostDomainsSchema, QuerriesSchema, ResponseSchema } from './model'

export const domainsRegistery = new OpenAPIRegistry()
export const domainsRouter: Router = express.Router()

domainsRouter.get('/', requestLogger, validateRequest(PostDomainsSchema), domainsController.generateDomains)

domainsRegistery.registerPath(
	registerPath({
		config: {
			method: 'get',
			path: ROUTE.DOMAINS,
			tags: ['Domains'],
			request: {
				params: QuerriesSchema,
			},
			responses: createApiResponses([
				{ description: 'Domains found', schema: ResponseSchema },
				{ description: 'Invalid querry params', statusCode: StatusCodes.UNPROCESSABLE_ENTITY },
				{ description: 'Internal server error', statusCode: StatusCodes.INTERNAL_SERVER_ERROR },
			]),
		},
		protectedRoute: false,
	}),
)
