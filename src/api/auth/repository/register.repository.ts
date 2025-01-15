import dayjs from 'dayjs'

import { generateToken, hashPassword } from '@/common/utils/auth'
import { prisma } from '@/server'
import { ROLE } from '@/types'

import { ERROR } from '../constant'

export class RegisterRepository {
	async registerAsync(name: string, email: string, password: string, role: ROLE): Promise<string> {
		const findRole = await prisma.roles.findFirst({
			where: { name: role },
		})
		if (!findRole) throw new Error(ERROR.ROLE_NOT_FOUND)
		const findUser = await prisma.users.findFirst({
			where: { email },
		})
		if (findUser) throw new Error(ERROR.EXISTING_USER)
		const newUser = await prisma.users.create({
			data: {
				email,
				name,
				createdAt: dayjs().toISOString(),
				password: await hashPassword(password),
				id_roles: findRole.id,
			},
		})
		return generateToken(newUser.id, role)
	}
}

export const registerRepository = new RegisterRepository()
