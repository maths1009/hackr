import { StatusCodes } from 'http-status-codes'

import { ServiceResponse } from '@/common/models/serviceResponse'

import { Response } from './model'
import { isPasswordInFile } from './utils'

export class VerifPasswordService {
	async verifPassword(password: string): Promise<ServiceResponse<Response | null>> {
		try {
			const isPassword = await isPasswordInFile(password, `${__dirname}/passwords.txt`)
			return ServiceResponse.success<Response>('Verification ok', isPassword)
		} catch (error) {
			const err = error as Error
			switch (err.message) {
				default:
					return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR)
			}
		}
	}
}

export const verifPasswordService = new VerifPasswordService()
