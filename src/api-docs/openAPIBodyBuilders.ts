import { z } from 'zod'

import { ZodRequestBody } from '@asteasolutions/zod-to-openapi'

export const createApiBody = (schema: z.ZodTypeAny): ZodRequestBody => {
	return {
		content: {
			'application/json': {
				schema,
			},
		},
	}
}
