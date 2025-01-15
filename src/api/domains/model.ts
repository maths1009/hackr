import { z } from 'zod'

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

export type Querries = z.infer<typeof QuerriesSchema>
export const QuerriesSchema = z.object({
	name: z.string(),
})

export type Response = z.infer<typeof ResponseSchema>
export const ResponseSchema = z.array(z.string())

export const PostDomainsSchema = z.object({
	query: QuerriesSchema,
})
