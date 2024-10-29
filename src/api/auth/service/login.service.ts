import { StatusCodes } from 'http-status-codes'

import { ServiceResponse } from '@/common/models/serviceResponse'

import { LoginResponse } from '../model/login.model'
import { LoginRepository } from '../repository/login.repository'

export class LoginService {
	private loginRepository: LoginRepository

	constructor(repository: LoginRepository = new LoginRepository()) {
		this.loginRepository = repository
	}

	async login(email: string, password: string): Promise<ServiceResponse<LoginResponse | null>> {
		const loginResponse = await this.loginRepository.loginAsync(email, password)
		if (!loginResponse) return ServiceResponse.failure('Invalid email or password', null, StatusCodes.UNAUTHORIZED)
		return ServiceResponse.success<LoginResponse>('Login successful', loginResponse)
	}
}

export const authService = new LoginService()
