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

import { crawlerController } from './controller'
import { GetCrawlerSchema, QuerriesSchema, ResponseSchema } from './model'

export const crawlerRegistery = new OpenAPIRegistry()
export const crawlerRouter: Router = express.Router()

crawlerRouter.get(
	'/',
	requestLogger,
	authMiddleware(ROLE.USER),
	validateRequest(GetCrawlerSchema),
	crawlerController.verifEmail,
)

crawlerRegistery.registerPath(
	registerPath({
		config: {
			method: 'get',
			path: ROUTE.CRAWLER,
			tags: ['Crawler'],
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
