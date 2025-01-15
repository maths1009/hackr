import express, { type Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { createApiBody } from '@/api-docs/openAPIBodyBuilders'
import { registerPath } from '@/api-docs/openAPIRegister'
import { createApiResponses } from '@/api-docs/openAPIResponseBuilders'
import { ROUTE } from '@/common/helpers/route'
import authMiddleware from '@/common/middleware/auth'
import requestLogger from '@/common/middleware/requestLogger'
import { validateRequest } from '@/common/utils/httpHandlers'
import { ROLE } from '@/types'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { ddosController } from './controller'
import { BodySchema, PostDDosSchema, ResponseSchema } from './model'

export const ddosRegistery = new OpenAPIRegistry()
export const ddosRouter: Router = express.Router()

ddosRouter.post('/', requestLogger, authMiddleware(ROLE.USER), validateRequest(PostDDosSchema), ddosController.ddos)

ddosRegistery.registerPath(
	registerPath({
		config: {
			method: 'post',
			path: ROUTE.DDOS,
			tags: ['DDoS'],
			request: {
				body: createApiBody(BodySchema),
			},
			responses: createApiResponses([
				{ description: 'x requests send', schema: ResponseSchema },
				{ description: 'Target is not reachable', statusCode: StatusCodes.BAD_REQUEST },
				{ description: 'Invalid querry params', statusCode: StatusCodes.UNPROCESSABLE_ENTITY },
				{ description: 'Internal server error', statusCode: StatusCodes.INTERNAL_SERVER_ERROR },
			]),
		},
		protectedRoute: true,
	}),
)
