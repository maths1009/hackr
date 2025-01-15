import express, { type Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { registerPath } from '@/api-docs/openAPIRegister'
import { createApiResponses } from '@/api-docs/openAPIResponseBuilders'
import { ROUTE } from '@/common/helpers/route'
import authMiddleware from '@/common/middleware/auth'
import requestLogger from '@/common/middleware/requestLogger'
import { ROLE } from '@/types'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { usersController } from './controller'
import { ResponseSchema } from './model'

export const usersRegistery = new OpenAPIRegistry()
export const usersRouter: Router = express.Router()

usersRouter.get('/', requestLogger, authMiddleware(ROLE.ADMIN), usersController.getAll)

usersRegistery.registerPath(
	registerPath({
		config: {
			method: 'get',
			path: ROUTE.USERS,
			tags: ['Users'],
			responses: createApiResponses([
				{ description: 'Users found', schema: ResponseSchema },
				{ description: 'Internal server error', statusCode: StatusCodes.INTERNAL_SERVER_ERROR },
			]),
		},
		protectedRoute: true,
	}),
)
