import express, { type Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { createApiBody } from '@/api-docs/openAPIBodyBuilders'
import { registerPath } from '@/api-docs/openAPIRegister'
import { createApiResponses } from '@/api-docs/openAPIResponseBuilders'
import { authMiddleware } from '@/common/middleware/authMiddleware'
import { validateRequest } from '@/common/utils/httpHandlers'
import { ROLE } from '@/types'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { loginController } from './controller/login.controller'
import { registerController } from './controller/register.controller'
import { LoginBodySchema, LoginResponseSchema, PostLoginSchema } from './model/login.model'
import { PostRegisterSchema, RegisterBodySchema, RegisterResponseSchema } from './model/register.model'

export const authRegistry = new OpenAPIRegistry()
export const authRouter: Router = express.Router()

authRouter.post('/login', validateRequest(PostLoginSchema), loginController.login)
authRegistry.registerPath(
	registerPath({
		config: {
			method: 'post',
			path: '/auth/login',
			tags: ['Auth'],
			request: {
				body: createApiBody(LoginBodySchema),
			},
			responses: createApiResponses([
				{ schema: LoginResponseSchema, description: 'Success' },
				{ description: 'Invalid email or password', statusCode: StatusCodes.UNAUTHORIZED },
				{ description: 'Invalid body', statusCode: StatusCodes.UNPROCESSABLE_ENTITY },
			]),
		},
	}),
)

authRouter.post(
	'/register',
	authMiddleware(ROLE.ADMIN),
	validateRequest(PostRegisterSchema),
	registerController.register,
)
authRegistry.registerPath(
	registerPath({
		config: {
			method: 'post',
			path: '/auth/register',
			tags: ['Auth'],
			request: {
				body: createApiBody(RegisterBodySchema),
			},
			responses: createApiResponses([
				{ schema: RegisterResponseSchema, description: 'Success', statusCode: StatusCodes.CREATED },
				{ description: 'Invalid role', statusCode: StatusCodes.BAD_REQUEST },
				{ description: 'User already exists', statusCode: StatusCodes.CONFLICT },
				{ description: 'Internal server error', statusCode: StatusCodes.INTERNAL_SERVER_ERROR },
				{ description: 'Invalid body', statusCode: StatusCodes.UNPROCESSABLE_ENTITY },
			]),
		},
		protectedRoute: true,
	}),
)
