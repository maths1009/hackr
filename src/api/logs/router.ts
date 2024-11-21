import express, { type Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { registerPath } from '@/api-docs/openAPIRegister'
import { createApiResponses } from '@/api-docs/openAPIResponseBuilders'
import { ROUTE } from '@/common/helpers/route'
import authMiddleware from '@/common/middleware/auth'
import { validateRequest } from '@/common/utils/httpHandlers'
import { ROLE } from '@/types'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { logsController } from './controller'
import { PostLogsSchema, QuerriesSchema, ResponseSchema } from './model'

export const logsRegistry = new OpenAPIRegistry()
export const logsRouter: Router = express.Router()

//@ts-expect-error Type mismatch between PostLogsSchema and expected schema
logsRouter.get('/', authMiddleware(ROLE.ADMIN), validateRequest(PostLogsSchema), logsController.getLogs)

logsRegistry.registerPath(
	registerPath({
		config: {
			method: 'get',
			path: ROUTE.LOGS,
			tags: ['Logs'],
			request: {
				query: QuerriesSchema,
			},
			responses: createApiResponses([
				{ description: 'Success', schema: ResponseSchema },
				{ description: 'Invalid querries params', statusCode: StatusCodes.UNPROCESSABLE_ENTITY },
				{ description: 'Internal server error', statusCode: StatusCodes.INTERNAL_SERVER_ERROR },
			]),
		},
		protectedRoute: true,
	}),
)
