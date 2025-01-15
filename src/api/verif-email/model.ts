import { z } from 'zod'

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

export type Querries = z.infer<typeof QuerriesSchema>
export const QuerriesSchema = z.object({
	email: z.string().email(),
})

export type Response = z.infer<typeof ResponseSchema>
export const ResponseSchema = z.boolean()

export const GetVerifEmailSchema = z.object({
	query: QuerriesSchema,
})
