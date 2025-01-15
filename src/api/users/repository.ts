import { prisma } from '@/server'

export class UsersRepository {
	async getAllAsync() {
		const users = await prisma.users.findMany()
		return users
	}
}

export const usersRepository = new UsersRepository()
