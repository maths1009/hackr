import { StatusCodes } from 'http-status-codes'

import { ServiceResponse } from '@/common/models/serviceResponse'

import { Response } from './model'
import { scrapeInfo } from './utils'

export class CrawlerService {
	async crawler(q: string): Promise<ServiceResponse<Response | null>> {
		try {
			const infos = await scrapeInfo(q)
			return ServiceResponse.success<Response>('informations', infos)
		} catch (error) {
			const err = error as Error
			switch (err.message) {
				default:
					return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR)
			}
		}
	}
}

export const crawlerService = new CrawlerService()
