import express, { type Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { registerPath } from '@/api-docs/openAPIRegister'
import { createApiResponses } from '@/api-docs/openAPIResponseBuilders'
import { ROUTE } from '@/common/helpers/route'
import authMiddleware from '@/common/middleware/auth'
import requestLogger from '@/common/middleware/requestLogger'
import { validateRequest } from '@/common/utils/httpHandlers'
import { ROLE } from '@/types'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { passwordController } from './controller'
import { PostPasswordSchema, QuerriesSchema, ResponseSchema } from './model'

export const passwordRegistery = new OpenAPIRegistry()
export const passwordRouter: Router = express.Router()

passwordRouter.get(
	'/',
	requestLogger,
	authMiddleware(ROLE.USER),
	validateRequest(PostPasswordSchema),
	//@ts-expect-error Type mismatch between PostPasswordSchema and expected schema
	passwordController.generatePassword,
)

passwordRegistery.registerPath(
	registerPath({
		config: {
			method: 'get',
			path: ROUTE.PASSWORD,
			tags: ['Password'],
			request: {
				params: QuerriesSchema,
			},
			responses: createApiResponses([
				{ description: 'Password generated', schema: ResponseSchema },
				{ description: 'Invalid querry params', statusCode: StatusCodes.UNPROCESSABLE_ENTITY },
				{ description: 'Internal server error', statusCode: StatusCodes.INTERNAL_SERVER_ERROR },
			]),
		},
		protectedRoute: true,
	}),
)
