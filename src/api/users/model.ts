import { z } from 'zod'

import { ROLE } from '@/types'
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

export type Response = z.infer<typeof ResponseSchema>
export const ResponseSchema = z.array(
	z.object({
		email: z.string().email(),
		createdAt: z.date(),
		role: z.nativeEnum(ROLE),
		name: z.string(),
	}),
)
