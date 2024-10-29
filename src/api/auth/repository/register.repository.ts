import { prisma } from '@/server'
import { ROLE } from '@/type'

import { RegisterResponse } from '../model/register.model'
import { generateToken, hashPassword } from '../utils'

export class RegisterRepository {
	async registerAsync(name: string, email: string, password: string, role: ROLE): Promise<RegisterResponse | null> {
		const findRole = await prisma.roles.findFirst({
			where: { name: role },
		})
		if (!findRole) return null
		const newUser = await prisma.users.create({
			data: {
				email,
				name,
				createdAt: new Date().toISOString(),
				password: await hashPassword(password),
				id_roles: findRole.id,
			},
		})
		return { token: generateToken(newUser.id.toString(), role) }
	}
}

export const registerRepository = new RegisterRepository()
