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

import { verifEmailController } from './controller'
import { GetVerifEmailSchema, QuerriesSchema, ResponseSchema } from './model'

export const verifEmailRegistery = new OpenAPIRegistry()
export const verifEmailRouter: Router = express.Router()

verifEmailRouter.get(
	'/',
	requestLogger,
	authMiddleware(ROLE.USER),
	validateRequest(GetVerifEmailSchema),
	verifEmailController.verifEmail,
)

verifEmailRegistery.registerPath(
	registerPath({
		config: {
			method: 'get',
			path: ROUTE.VERIF_EMAIL,
			tags: ['Verif email'],
			request: {
				params: QuerriesSchema,
			},
			responses: createApiResponses([
				{ description: 'Verification ok', schema: ResponseSchema },
				{ description: 'Invalid querry params', statusCode: StatusCodes.UNPROCESSABLE_ENTITY },
				{ description: 'Internal server error', statusCode: StatusCodes.INTERNAL_SERVER_ERROR },
			]),
		},
		protectedRoute: true,
	}),
)
