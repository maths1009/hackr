import { StatusCodes } from 'http-status-codes'

import { ServiceResponse } from '@/common/models/serviceResponse'
import { env } from '@/common/utils/envConfig'
import { faker } from '@faker-js/faker'

import { Response } from './model'
import { spamEmails } from './utils'

export class SpamEmailService {
	async spam(to: string, count: number, subject?: string, body?: string): Promise<ServiceResponse<Response | null>> {
		try {
			const results = await spamEmails(
				to,
				count,
				subject ?? faker.lorem.sentence(),
				body ?? faker.lorem.paragraph(),
				env.MAILJET_API_KEY,
				env.MAILJET_SECRET_KEY,
				env.FROM_EMAIL,
			)
			return ServiceResponse.success<Response>(`${results.length} emails send`, results)
		} catch (error) {
			const err = error as Error
			switch (err.message) {
				default:
					return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR)
			}
		}
	}
}

export const spamEmailService = new SpamEmailService()
