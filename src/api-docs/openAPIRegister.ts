import { StatusCodes } from 'http-status-codes'

import { RouteConfig } from '@asteasolutions/zod-to-openapi'

import { createApiResponse } from './openAPIResponseBuilders'

type RegisterPathParams = {
	config: RouteConfig
	protectedRoute?: boolean
}

export const registerPath = ({ config, protectedRoute: protectedRoute = true }: RegisterPathParams): RouteConfig => {
	return {
		...config,
		responses: {
			...config.responses,
			...(protectedRoute &&
				createApiResponse({
					statusCode: StatusCodes.UNAUTHORIZED,
					description: 'Unauthorized',
				})),
		},
	}
}
