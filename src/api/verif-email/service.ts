import { StatusCodes } from 'http-status-codes'

import { ServiceResponse } from '@/common/models/serviceResponse'

import { Response } from './model'
import { getEmailSmtp, verifyEmailSMTP } from './utils'

export class VerifEmailService {
	async verifEmail(email: string): Promise<ServiceResponse<Response | null>> {
		try {
			const smtpServer = await getEmailSmtp(email)
			const isValidEmail = !!smtpServer && (await verifyEmailSMTP(email, smtpServer))
			return ServiceResponse.success<Response>('Verification ok', isValidEmail)
		} catch (error) {
			const err = error as Error
			switch (err.message) {
				default:
					return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR)
			}
		}
	}
}

export const verifEmailService = new VerifEmailService()
