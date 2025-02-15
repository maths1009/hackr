import express, { type Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { createApiBody } from '@/api-docs/openAPIBodyBuilders'
import { registerPath } from '@/api-docs/openAPIRegister'
import { createApiResponses } from '@/api-docs/openAPIResponseBuilders'
import { AUTH_ROUTE, ROUTE } from '@/common/helpers/route'
import authMiddleware from '@/common/middleware/auth'
import requestLogger from '@/common/middleware/requestLogger'
import { validateRequest } from '@/common/utils/httpHandlers'
import { ROLE } from '@/types'
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { loginController } from './controller/login.controller'
import { registerController } from './controller/register.controller'
import { LoginBodySchema, LoginResponseSchema, PostLoginSchema } from './model/login.model'
import { PostRegisterSchema, RegisterBodySchema, RegisterResponseSchema } from './model/register.model'

export const authRegistry = new OpenAPIRegistry()
export const authRouter: Router = express.Router()

authRouter.post(ROUTE.LOGIN, validateRequest(PostLoginSchema), loginController.login)
authRegistry.registerPath(
	registerPath({
		config: {
			method: 'post',
			path: AUTH_ROUTE.LOGIN,
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
	ROUTE.REGISTER,
	authMiddleware(ROLE.ADMIN),
	requestLogger,
	validateRequest(PostRegisterSchema),
	registerController.register,
)
authRegistry.registerPath(
	registerPath({
		config: {
			method: 'post',
			path: AUTH_ROUTE.REGISTER,
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
