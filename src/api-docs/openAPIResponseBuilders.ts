import { StatusCodes } from 'http-status-codes'
import type { z } from 'zod'

import { ServiceResponseSchema } from '@/common/models/serviceResponse'
import type { ResponseConfig } from '@asteasolutions/zod-to-openapi'

type ApiResponseConfig = {
	schema?: z.ZodTypeAny
	description: string
	statusCode?: StatusCodes
}

type ApiResponse = {
	[statusCode: number]: ResponseConfig
}

export const createApiResponse = ({
	schema,
	description,
	statusCode = StatusCodes.OK,
}: ApiResponseConfig): ApiResponse => {
	return {
		[statusCode]: {
			description,
			content: {
				'application/json': {
					schema: ServiceResponseSchema(schema),
				},
			},
		},
	}
}

export const createApiResponses = (configs: ApiResponseConfig[]) =>
	configs.reduce((acc, config) => {
		return { ...acc, ...createApiResponse(config) }
	}, {})
