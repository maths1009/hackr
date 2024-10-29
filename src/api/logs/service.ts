import { StatusCodes } from 'http-status-codes'

import { ServiceResponse } from '@/common/models/serviceResponse'

import { LogDocument, Response } from './model'
import { LogsRepository } from './repository'

export class LogsService {
	private logsRepository: LogsRepository

	constructor(repository: LogsRepository = new LogsRepository()) {
		this.logsRepository = repository
	}

	async getLogs(start: string, end: string): Promise<ServiceResponse<Response | null>> {
		try {
			const logs = await this.logsRepository.getLogsAsync(start, end)
			const transformedLogs: Response = logs.hits.hits.map(l => {
				const log = (l as LogDocument)._source
				return {
					hostname: log.hostname,
					time: log.time,
					request: log.request,
					response: log.response,
				}
			})
			return ServiceResponse.success<Response>('Logs retrieved', transformedLogs)
		} catch (error) {
			const err = error as Error
			switch (err.message) {
				default:
					return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR)
			}
		}
	}
}

export const logsService = new LogsService()
