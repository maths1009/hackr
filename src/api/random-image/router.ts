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

import { randomImageController } from './controller'
import { GetGenerateImageSchema, QuerriesSchema, ResponseSchema } from './model'

export const randomImageRegistery = new OpenAPIRegistry()
export const randomImageRouter: Router = express.Router()

randomImageRouter.get(
	'/',
	requestLogger,
	authMiddleware(ROLE.USER),
	validateRequest(GetGenerateImageSchema),
	randomImageController.generateRandomImage,
)

randomImageRegistery.registerPath(
	registerPath({
		config: {
			method: 'get',
			path: ROUTE.RANDOM_IMAGE,
			tags: ['Random Image'],
			request: {
				params: QuerriesSchema,
			},
			responses: createApiResponses([
				{ description: 'Random Image generated', schema: ResponseSchema },
				{ description: 'Invalid querry params', statusCode: StatusCodes.UNPROCESSABLE_ENTITY },
				{ description: 'Internal server error', statusCode: StatusCodes.INTERNAL_SERVER_ERROR },
			]),
		},
		protectedRoute: true,
	}),
)
