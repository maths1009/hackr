import { StatusCodes } from 'http-status-codes'

import { ServiceResponse } from '@/common/models/serviceResponse'

import { RegisterResponse } from '../model/register.model'
import { RegisterRepository } from '../repository/register.repository'

export class RegisterService {
	private registerRepository: RegisterRepository

	constructor(repository: RegisterRepository = new RegisterRepository()) {
		this.registerRepository = repository
	}

	async register(
		name: string,
		email: string,
		password: string,
		roleId: number,
	): Promise<ServiceResponse<RegisterResponse | null>> {
		const registerResponse = await this.registerRepository.registerAsync(name, email, password, roleId)
		if (!registerResponse) return ServiceResponse.failure('Invalid role', null, StatusCodes.BAD_REQUEST)
		return ServiceResponse.success<RegisterResponse>('Registration successful', registerResponse, StatusCodes.CREATED)
	}
}

export const registerService = new RegisterService()
