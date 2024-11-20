import { StatusCodes } from 'http-status-codes'

import { ServiceResponse } from '@/common/models/serviceResponse'

import { Querries, Response } from './model'
import { CrtResult } from './types'
import { getSubdomainsFromCert } from './utils'

export class DomainsService {
	async getDomains(querries: Querries): Promise<ServiceResponse<Response | null>> {
		try {
			const url = `https://crt.sh/?q=${querries.name}&output=json`
			const response = await fetch(url)
			if (!response.ok) {
				return ServiceResponse.failure(`Failed to fetch domains: ${response.statusText}`, null, response.status)
			}
			const certs = (await response.json()) as CrtResult[]
			const subs = getSubdomainsFromCert(certs)
			return ServiceResponse.success<Response>('Domains found', subs)
		} catch (error) {
			const err = error as Error
			switch (err.message) {
				default:
					return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR)
			}
		}
	}
}

export const domainsService = new DomainsService()
