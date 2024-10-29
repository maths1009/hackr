import { StatusCodes } from 'http-status-codes'

import { ServiceResponse } from '@/common/models/serviceResponse'

import { ERROR } from '../constant'
import { LoginResponse } from '../model/login.model'
import { LoginRepository } from '../repository/login.repository'

export class LoginService {
	private loginRepository: LoginRepository

	constructor(repository: LoginRepository = new LoginRepository()) {
		this.loginRepository = repository
	}

	async login(email: string, password: string): Promise<ServiceResponse<LoginResponse | null>> {
		try {
			const loginResponse = await this.loginRepository.loginAsync(email, password)
			return ServiceResponse.success<LoginResponse>('Login successful', { token: loginResponse })
		} catch (error) {
			const err = error as Error
			switch (err.message) {
				case ERROR.USER_NOT_FOUND:
					return ServiceResponse.failure(ERROR.USER_NOT_FOUND, null, StatusCodes.UNAUTHORIZED)
				default:
					return ServiceResponse.failure(err.message, null, StatusCodes.INTERNAL_SERVER_ERROR)
			}
		}
	}
}

export const authService = new LoginService()
