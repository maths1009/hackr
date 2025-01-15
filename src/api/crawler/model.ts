import { z } from 'zod'

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

export type Querries = z.infer<typeof QuerriesSchema>
export const QuerriesSchema = z.object({
	q: z.string().min(1),
})

export type Response = z.infer<typeof ResponseSchema>
export const ResponseSchema = z.union([
	z.array(
		z.object({
			title: z.string(),
			link: z.string(),
			snippet: z.string(),
		}),
	),
	z.object({
		error: z.unknown(),
	}),
])

export const GetCrawlerSchema = z.object({
	query: QuerriesSchema,
})
