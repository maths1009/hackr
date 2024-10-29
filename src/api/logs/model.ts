import { z } from 'zod'

import { ServiceResponseSchema } from '@/common/models/serviceResponse'
import { validDate } from '@/common/utils/commonValidation'
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

export type Body = z.infer<typeof BodySchema>
export const BodySchema = z
	.object({
		start_date: validDate('start_date'),
		end_date: validDate('end_date'),
	})
	.refine(data => data.start_date <= data.end_date, {
		message: 'start_date must be before or equal to end_date',
		path: ['start_date'],
	})

export type Response = z.infer<typeof ResponseSchema>
export const ResponseSchema = z.array(
	z.object({
		hostname: z.string(),
		time: z.string(),
		request: z.object({
			method: z.string(),
			url: z.string(),
		}),
		response: ServiceResponseSchema(),
	}),
)

export const PostLogsSchema = z.object({
	body: BodySchema,
})

export interface LogDocument {
	_source: {
		hostname: string
		time: string
		request: {
			method: string
			url: string
		}
		response: {
			success: boolean
			message: string
			statusCode: number
			responseObject: unknown
		}
	}
}
