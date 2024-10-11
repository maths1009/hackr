import { prisma } from '@/server'
import { ROLE } from '@/type'

import { AuthLoginResponse, AuthRegisterResponse } from './model'
import { comparePassword, generateToken, hashPassword } from './utils'

export class AuthRepository {
	async loginAsync(email: string, password: string): Promise<AuthLoginResponse | null> {
		const user = await prisma.users.findFirst({ where: { email: email } })
		if (!user) return null
		const passwordMatch = await comparePassword(password, user?.password)
		if (!passwordMatch) return null
		const userRole = await prisma.roles.findFirst({
			where: { id: user!.id_roles },
		})
		const role = ROLE[userRole!.name as keyof typeof ROLE]
		return { token: generateToken(user.id.toString(), role) }
	}

	async registerAsync(
		name: string,
		email: string,
		password: string,
		roleId: number,
	): Promise<AuthRegisterResponse | null> {
		const role = await prisma.roles.findFirst({
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
