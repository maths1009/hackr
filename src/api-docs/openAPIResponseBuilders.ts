import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

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

const isBufferSchema = (schema: z.ZodTypeAny): boolean => {
	try {
		const bufferExample = Buffer.from('example')
		schema.parse(bufferExample)
		return true
	} catch {
		return false
	}
}

export const createApiResponse = ({
	schema,
	description,
	statusCode = StatusCodes.OK,
}: ApiResponseConfig): ApiResponse => {
	if (schema && isBufferSchema(schema)) {
		return {
			[statusCode]: {
				description,
				content: {
					'image/jpeg': {
						schema: {
							type: 'string',
							format: 'binary',
						},
					},
				},
			},
		}
	}
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
