import { z } from 'zod'

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

export type Querries = z.infer<typeof QuerriesSchema>
export const QuerriesSchema = z.object({
	password: z.string(),
})

export type Response = z.infer<typeof ResponseSchema>
export const ResponseSchema = z.boolean()

export const GetVerifPasswordSchema = z.object({
	query: QuerriesSchema,
})
