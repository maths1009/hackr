import { StatusCodes } from 'http-status-codes'

import { ServiceResponse } from '@/common/models/serviceResponse'

import { Querries, Response } from './model'
import { generatePassword } from './utils'

export class PasswordService {
	async getPassword(querries: Querries): Promise<ServiceResponse<Response | null>> {
		try {
			const password = generatePassword({
				length: parseInt(querries.length as unknown as string),
				caractereParams: JSON.parse(querries.caractereParams as unknown as string),
			})
			return ServiceResponse.success<Response>('Password generated', password)
		} catch (error) {
			const err = error as Error
			switch (err.message) {
				default:
					return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR)
			}
		}
	}
}

export const passwordService = new PasswordService()
