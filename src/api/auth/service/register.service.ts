import { StatusCodes } from 'http-status-codes'

import { ServiceResponse } from '@/common/models/serviceResponse'

import { ERROR } from '../constant'
import { RegisterBody, RegisterResponse } from '../model/register.model'
import { RegisterRepository } from '../repository/register.repository'

export class RegisterService {
	private registerRepository: RegisterRepository

	constructor(repository: RegisterRepository = new RegisterRepository()) {
		this.registerRepository = repository
	}

	async register({ name, email, password, role }: RegisterBody): Promise<ServiceResponse<RegisterResponse | null>> {
		try {
			const registerResponse = await this.registerRepository.registerAsync(name, email, password, role)
			return ServiceResponse.success<RegisterResponse>(
				'Registration successful',
				{ token: registerResponse },
				StatusCodes.CREATED,
			)
		} catch (error: unknown) {
			const err = error as Error
			switch (err.message) {
				case ERROR.ROLE_NOT_FOUND:
					return ServiceResponse.failure(ERROR.ROLE_NOT_FOUND, null, StatusCodes.BAD_REQUEST)
				case ERROR.EXISTING_USER:
					// TODO review this status code and message because is a fault, however this route is protected by admin role
					return ServiceResponse.failure(ERROR.EXISTING_USER, null, StatusCodes.CONFLICT)
				default:
					return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR)
			}
		}
	}
}

export const registerService = new RegisterService()
