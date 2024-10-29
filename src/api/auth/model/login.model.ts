import { z } from 'zod'

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

export type LoginBody = z.infer<typeof LoginBodySchema>
export const LoginBodySchema = z.object({
	email: z.string().email(),
	password: z.string(),
})

export type LoginResponse = z.infer<typeof LoginResponseSchema>
export const LoginResponseSchema = z.object({
	token: z.string(),
})

export const PostLoginSchema = z.object({
	body: LoginBodySchema,
})
