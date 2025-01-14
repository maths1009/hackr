import dayjs from 'dayjs'
import { z } from 'zod'

import { ROUTE } from '@/common/helpers/route'
import { ServiceResponseSchema } from '@/common/models/serviceResponse'
import { commonValidations, validDate } from '@/common/utils/commonValidation'
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

export type Querries = z.infer<typeof QuerriesSchema>
export const QuerriesSchema = z
	.object({
		startDate: validDate('startDate'),
		endDate: validDate('endDate'),
		userId: commonValidations.id.optional(),
		request: z.preprocess(
			val => (typeof val === 'string' ? val.replace(/^\//, '') : val),
			z.enum(Object.values(ROUTE).map(route => route.slice(1)) as [string, ...string[]]).optional(),
		),
	})
	.refine(
		data => {
			const startDate = dayjs(data.startDate)
			const endDate = dayjs(data.endDate)
			return startDate.isBefore(endDate) || startDate.isSame(endDate)
		},
		{
			message: 'start_date must be before or equal to end_date',
			path: ['startDate'],
		},
	)

export type Response = z.infer<typeof ResponseSchema>
export const ResponseSchema = z.array(
	z
		.object({
			method: z.string(),
			url: z.string(),
			responseTime: z.string().optional(),
		})
		.merge(ServiceResponseSchema()),
)

export const PostLogsSchema = z.object({
	query: QuerriesSchema,
})

export interface LogDocument {
	_source: {
		'@timestamp': string
		message: string
		severity: string
		fields: {
			requestId: string
			method: string
			url: string
			statusCode: number
			userId: number
			responseTime?: string
			responseBody: string
		}
	}
}
