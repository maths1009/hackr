import express, { type Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { createApiBody } from '@/api-docs/openAPIBodyBuilders'
import { registerPath } from '@/api-docs/openAPIRegister'
import { createApiResponses } from '@/api-docs/openAPIResponseBuilders'
import { authMiddleware } from '@/common/middleware/authMiddleware'
import { validateRequest } from '@/common/utils/httpHandlers'
import { ROLE } from '@/types'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { logsController } from './controller'
import { BodySchema, PostLogsSchema, ResponseSchema } from './model'

export const logsRegistry = new OpenAPIRegistry()
export const logsRouter: Router = express.Router()

//TODO: Review this webservice, POST to get with params and selector of data to get

logsRouter.post('/', authMiddleware(ROLE.ADMIN), validateRequest(PostLogsSchema), logsController.getLogs)

logsRegistry.registerPath(
	registerPath({
		config: {
			method: 'post',
			path: '/logs',
			tags: ['Logs'],
			request: {
				body: createApiBody(BodySchema),
			},
			responses: createApiResponses([
				{ description: 'Success', schema: ResponseSchema },
				{ description: 'Invalid body', statusCode: StatusCodes.UNPROCESSABLE_ENTITY },
				{ description: 'Internal server error', statusCode: StatusCodes.INTERNAL_SERVER_ERROR },
			]),
		},
		protectedRoute: true,
	}),
)
