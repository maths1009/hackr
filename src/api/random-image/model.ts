import { z } from 'zod'

import { validNumber } from '@/common/utils/commonValidation'
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

export type Querries = z.infer<typeof QuerriesSchema>
export const QuerriesSchema = z.object({
	width: validNumber('width').optional(),
	height: validNumber('height').optional(),
})

export type Response = z.infer<typeof ResponseSchema>
export const ResponseSchema = z.instanceof(Buffer)

export const GetGenerateImageSchema = z.object({
	query: QuerriesSchema,
})
