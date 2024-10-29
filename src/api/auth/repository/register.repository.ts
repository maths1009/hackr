import { prisma } from '@/server'
import { ROLE } from '@/type'

import { RegisterResponse } from '../model/register.model'
import { generateToken, hashPassword } from '../utils'

export class RegisterRepository {
	async registerAsync(name: string, email: string, password: string, roleId: number): Promise<RegisterResponse | null> {
		const role = await prisma.roles.findUnique({
			where: { id: roleId },
		})
		if (!role) return null
		const newUser = await prisma.users.create({
			data: {
				email,
				name,
				createdAt: new Date().toISOString(),
				password: await hashPassword(password),
				id_roles: roleId,
			},
		})
		return { token: generateToken(newUser.id.toString(), role.name as ROLE) }
	}
}

export const registerRepository = new RegisterRepository()
