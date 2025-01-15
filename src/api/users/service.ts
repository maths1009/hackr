import { StatusCodes } from 'http-status-codes'

import { ServiceResponse } from '@/common/models/serviceResponse'
import { prisma } from '@/server'
import { ROLE } from '@/types'

import { Response } from './model'
import { UsersRepository } from './repository'

export class UsersService {
	private usersRepository: UsersRepository

	constructor(repository: UsersRepository = new UsersRepository()) {
		this.usersRepository = repository
	}

	async getAll(): Promise<ServiceResponse<Response | null>> {
		try {
			const users = await this.usersRepository.getAllAsync()
			return ServiceResponse.success<Response>(
				'Users found',
				await Promise.all(
					users.map(async ({ createdAt, email, name, id_roles }) => ({
						createdAt,
						email,
						name,
						role: (await prisma.roles.findUnique({ where: { id: id_roles } }))?.name as ROLE,
					})),
				),
			)
		} catch (error) {
			const err = error as Error
			switch (err.message) {
				default:
					return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR)
			}
		}
	}
}

export const usersService = new UsersService()
