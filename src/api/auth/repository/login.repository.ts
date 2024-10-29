import { prisma } from '@/server'
import { ROLE } from '@/type'

import { LoginResponse } from '../model/login.model'
import { comparePassword, generateToken } from '../utils'

export class LoginRepository {
	async loginAsync(email: string, password: string): Promise<LoginResponse | null> {
		const user = await prisma.users.findFirst({ where: { email } })
		if (!user) return null

		const passwordMatch = await comparePassword(password, user.password)
		if (!passwordMatch) return null

		const userRole = await prisma.roles.findUnique({ where: { id: user.id_roles } })
		const role = ROLE[userRole!.name as keyof typeof ROLE]

		return { token: generateToken(user.id.toString(), role) }
	}
}

export const loginRepository = new LoginRepository()
