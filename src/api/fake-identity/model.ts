import { z } from 'zod'

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

import { IDENTITY_QUERRIES } from './constant'

extendZodWithOpenApi(z)

export type Querries = z.infer<typeof QuerriesSchema>
export const QuerriesSchema = z.object({
	params: z.preprocess(
		val => {
			if (typeof val === 'string') {
				return val
					.split('')
					.map(char => IDENTITY_QUERRIES[char as keyof typeof IDENTITY_QUERRIES])
					.filter(Boolean)
			}
			return val
		},
		z.array(z.nativeEnum(IDENTITY_QUERRIES)),
	),
})

export type Response = z.infer<typeof ResponseSchema>
export const ResponseSchema = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	email: z.string().optional(),
	phone: z.string().optional(),
	address: z.string().optional(),
	company: z.string().optional(),
	job: z.string().optional(),
	birthday: z.string().optional(),
	age: z.number().optional(),
})

export const PostFakeIdentitySchema = z.object({
	query: QuerriesSchema,
})
