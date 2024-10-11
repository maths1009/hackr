import { z } from 'zod'

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

// LOGIN
export type AuthLoginBody = z.infer<typeof AuthLoginBodySchema>
export const AuthLoginBodySchema = z.object({
	name: z.string(),
	password: z.string(),
})

export type AuthLoginResponse = z.infer<typeof AuthLoginResponseSchema>
export const AuthLoginResponseSchema = z.object({
	token: z.string(),
})

// REGISTER
export type AuthRegisterBody = z.infer<typeof AuthRegisterBodySchema>
export const AuthRegisterBodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
	roleId: z.number(),
})

export type AuthRegisterResponse = z.infer<typeof AuthRegisterResponseSchema>
export const AuthRegisterResponseSchema = z.object({
	token: z.string(),
})
