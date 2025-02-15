import { z } from 'zod'

import { validNumber } from '@/common/utils/commonValidation'
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

export type Body = z.infer<typeof BodySchema>
export const BodySchema = z.object({
	to: z.string().email(),
	count: validNumber('count'),
	subject: z.string().min(1).optional(),
	body: z.string().min(1).optional(),
})

export type Response = z.infer<typeof ResponseSchema>
export const ResponseSchema = z.array(
	z.union([
		z.object({
			success: z.boolean(),
			data: z.any(),
		}),
		z.object({
			success: z.boolean(),
			error: z.any(),
		}),
	]),
)

export const PostSpamEmailSchema = z.object({
	body: BodySchema,
})
