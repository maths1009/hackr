import express, { type Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { registerPath } from '@/api-docs/openAPIRegister'
import { createApiResponses } from '@/api-docs/openAPIResponseBuilders'
import { ROUTE } from '@/common/helpers/route'
import { validateRequest } from '@/common/utils/httpHandlers'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { passwordController } from './controller'
import { PostPasswordSchema, QuerriesSchema, ResponseSchema } from './model'

export const passwordRegistery = new OpenAPIRegistry()
export const passwordRouter: Router = express.Router()

//@ts-expect-error Type mismatch between PostPasswordSchema and expected schema
passwordRouter.get('/', validateRequest(PostPasswordSchema), passwordController.generatePassword)

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
		protectedRoute: false,
	}),
)
