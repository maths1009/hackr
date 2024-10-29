import { z } from 'zod'

import { ROLE } from '@/type'
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

export type RegisterBody = z.infer<typeof RegisterBodySchema>
export const RegisterBodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
	role: z.nativeEnum(ROLE),
})

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>
export const RegisterResponseSchema = z.object({
	token: z.string(),
})

export const PostRegisterSchema = z.object({
	body: RegisterBodySchema,
})
