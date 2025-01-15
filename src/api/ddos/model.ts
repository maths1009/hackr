import { z } from 'zod'

import { validNumber } from '@/common/utils/commonValidation'
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

export type Body = z.infer<typeof BodySchema>
export const BodySchema = z.object({
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

export const PostDDosSchema = z.object({
	body: BodySchema,
})
