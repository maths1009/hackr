import { z } from 'zod'

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

import { CHARACTERE_QUERRIES } from './constant'

extendZodWithOpenApi(z)

export type Querries = z.infer<typeof QuerriesSchema>
export const QuerriesSchema = z.object({
	length: z.preprocess(val => {
		const parsed = parseInt(val as string)
		return isNaN(parsed) ? undefined : parsed
	}, z.number().int().max(1000).min(1)),
	caractereParams: z.preprocess(
		val => {
			if (typeof val === 'string') {
				return val
					.split('')
					.map(char => CHARACTERE_QUERRIES[char as keyof typeof CHARACTERE_QUERRIES])
					.filter(Boolean)
			}
			return val
		},
		z.array(z.nativeEnum(CHARACTERE_QUERRIES)),
	),
})

export type Response = z.infer<typeof ResponseSchema>
export const ResponseSchema = z.string()

export const PostPasswordSchema = z.object({
	query: QuerriesSchema,
})
