import express, { type Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { registerPath } from '@/api-docs/openAPIRegister'
import { createApiResponses } from '@/api-docs/openAPIResponseBuilders'
import { ROUTE } from '@/common/helpers/route'
import { validateRequest } from '@/common/utils/httpHandlers'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { fakeIdentityController } from './controller'
import { PostFakeIdentitySchema, QuerriesSchema, ResponseSchema } from './model'

export const fakeIdentityRegistery = new OpenAPIRegistry()
export const fakeIdentityRouter: Router = express.Router()

fakeIdentityRouter.get('/', validateRequest(PostFakeIdentitySchema), fakeIdentityController.generateFakeIdentity)

fakeIdentityRegistery.registerPath(
	registerPath({
		config: {
			method: 'get',
			path: ROUTE.FAKE_IDENTITY,
			tags: ['Fake identity'],
			request: {
				params: QuerriesSchema,
			},
			responses: createApiResponses([
				{ description: 'Fake identity generated', schema: ResponseSchema },
				{ description: 'Invalid querry params', statusCode: StatusCodes.UNPROCESSABLE_ENTITY },
				{ description: 'Internal server error', statusCode: StatusCodes.INTERNAL_SERVER_ERROR },
			]),
		},
		protectedRoute: false,
	}),
)
