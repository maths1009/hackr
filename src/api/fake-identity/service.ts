import { StatusCodes } from 'http-status-codes'

import { ServiceResponse } from '@/common/models/serviceResponse'

import { Querries, Response } from './model'
import { generateFakeIdentity } from './utils'

export class FakeIdentityService {
	async getPassword(querries: Querries): Promise<ServiceResponse<Response | null>> {
		try {
			const fakeIdentity = generateFakeIdentity({
				params: JSON.parse(querries.params as unknown as string),
			})
			return ServiceResponse.success<Response>('Password generated', fakeIdentity as Response)
		} catch (error) {
			const err = error as Error
			switch (err.message) {
				default:
					return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR)
			}
		}
	}
}

export const fakeIdentityService = new FakeIdentityService()
