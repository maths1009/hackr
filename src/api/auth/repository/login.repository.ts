import { comparePassword, generateToken } from '@/common/utils/auth'
import { prisma } from '@/server'
import { ROLE } from '@/types'

import { ERROR } from '../constant'

export class LoginRepository {
	async loginAsync(email: string, password: string): Promise<string> {
		const user = await prisma.users.findFirst({ where: { email } })
		if (!user) throw new Error(ERROR.USER_NOT_FOUND)

		const passwordMatch = await comparePassword(password, user.password)
		if (!passwordMatch) throw new Error(ERROR.USER_NOT_FOUND)

		const userRole = await prisma.roles.findUnique({ where: { id: user.id_roles } })
		const role = ROLE[userRole!.name as keyof typeof ROLE]

		return generateToken(user.id, role)
	}
}

export const loginRepository = new LoginRepository()
