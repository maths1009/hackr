import { z } from 'zod'

import { validNumber } from '@/common/utils/commonValidation'
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

export type Querries = z.infer<typeof QuerriesSchema>
export const QuerriesSchema = z.object({
	target: z.string().min(1),
	count: validNumber('count'),
})

export type Response = z.infer<typeof ResponseSchema>
export const ResponseSchema = z.array(
	z.union([
		z.object({
			status: z.number(),
		}),
		z.object({
			error: z.any(),
		}),
	]),
)

export const GetDDosSchema = z.object({
	query: QuerriesSchema,
})
