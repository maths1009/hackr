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

import { spamEmailController } from './controller'
import { GetSpamEmailSchema, QuerriesSchema, ResponseSchema } from './model'

export const spamEmailRegistery = new OpenAPIRegistry()
export const spamEmailRouter: Router = express.Router()

spamEmailRouter.get(
	'/',
	requestLogger,
	authMiddleware(ROLE.USER),
	validateRequest(GetSpamEmailSchema),
	spamEmailController.spam,
)

spamEmailRegistery.registerPath(
	registerPath({
		config: {
			method: 'get',
			path: ROUTE.SPAM_EMAIL,
			tags: ['Spam Email'],
			request: {
				params: QuerriesSchema,
			},
			responses: createApiResponses([
				{ description: 'x emails send', schema: ResponseSchema },
				{ description: 'Email or password is invalid', statusCode: StatusCodes.UNAUTHORIZED },
				{ description: 'Invalid querry params', statusCode: StatusCodes.UNPROCESSABLE_ENTITY },
				{ description: 'Internal server error', statusCode: StatusCodes.INTERNAL_SERVER_ERROR },
			]),
		},
		protectedRoute: true,
	}),
)
