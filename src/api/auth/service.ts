import { StatusCodes } from 'http-status-codes'

import { ServiceResponse } from '@/common/models/serviceResponse'

import { AuthLoginResponse, AuthRegisterResponse } from './model'
import { AuthRepository } from './repository'

export class AuthService {
	private authRepository: AuthRepository

	constructor(repository: AuthRepository = new AuthRepository()) {
		this.authRepository = repository
	}

	async login(email: string, password: string): Promise<ServiceResponse<AuthLoginResponse | null>> {
		const loginResponse = await this.authRepository.loginAsync(email, password)
		if (!loginResponse) return ServiceResponse.failure('Invalid email or password', null, StatusCodes.UNAUTHORIZED)
		return ServiceResponse.success<AuthLoginResponse>('Login successful', loginResponse)
	}

	async register(
		name: string,
		email: string,
		password: string,
		roleId: number,
	): Promise<ServiceResponse<AuthRegisterResponse | null>> {
		const registerResponse = await this.authRepository.registerAsync(name, email, password, roleId)
		if (!registerResponse) return ServiceResponse.failure('Registration failed', null, StatusCodes.BAD_REQUEST)
		return ServiceResponse.success<AuthRegisterResponse>(
			'Registration successful',
			registerResponse,
			StatusCodes.CREATED,
		)
	}
}

export const authService = new AuthService()
