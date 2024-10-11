import express, { type Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { createApiBody } from '@/api-docs/openAPIBodyBuilders'
import { registerPath } from '@/api-docs/openAPIRegister'
import { createApiResponses } from '@/api-docs/openAPIResponseBuilders'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { authController } from './controller'
import {
	AuthLoginBodySchema,
	AuthLoginResponseSchema,
	AuthRegisterBodySchema,
	AuthRegisterResponseSchema,
} from './model'

export const authRegistry = new OpenAPIRegistry()
export const authRouter: Router = express.Router()

authRouter.post('/login', authController.login)
authRegistry.registerPath(
	registerPath({
		config: {
			method: 'post',
			path: '/auth/login',
			tags: ['Auth'],
			request: {
				body: createApiBody(AuthLoginBodySchema),
			},
			responses: createApiResponses([{ schema: AuthLoginResponseSchema, description: 'Success' }]),
		},
	}),
)

authRouter.post('/register', authController.register)
authRegistry.registerPath(
	registerPath({
		config: {
			method: 'post',
			path: '/auth/register',
			tags: ['Auth'],
			request: {
				body: createApiBody(AuthRegisterBodySchema),
			},
			responses: createApiResponses([
				{ schema: AuthRegisterResponseSchema, description: 'Success', statusCode: StatusCodes.CREATED },
				{ description: 'Bad Request', statusCode: StatusCodes.BAD_REQUEST },
			]),
		},
	}),
)
