import { StatusCodes } from 'http-status-codes'

import { RouteConfig } from '@asteasolutions/zod-to-openapi'

import { createApiResponse } from './openAPIResponseBuilders'

type RegisterPathParams = {
	config: RouteConfig
	protectedRoute?: boolean
}

export const registerPath = ({ config, protectedRoute: protectedRoute = false }: RegisterPathParams): RouteConfig => {
	return {
		...config,
		responses: {
			...config.responses,
			...(protectedRoute && {
				...createApiResponse({
					statusCode: StatusCodes.UNAUTHORIZED,
					description: 'Authorization header missing or Invalid token',
				}),
				...createApiResponse({
					statusCode: StatusCodes.FORBIDDEN,
					description: 'Unauthorized',
				}),
			}),
		},
	}
}
