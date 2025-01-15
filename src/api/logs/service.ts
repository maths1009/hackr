import { StatusCodes } from 'http-status-codes'

import { ServiceResponse } from '@/common/models/serviceResponse'

import { LogDocument, Querries, Response } from './model'
import { LogsRepository } from './repository'

export class LogsService {
	private logsRepository: LogsRepository

	constructor(repository: LogsRepository = new LogsRepository()) {
		this.logsRepository = repository
	}

	async getLogs(querries: Querries): Promise<ServiceResponse<Response | null>> {
		try {
			const logs = await this.logsRepository.getLogsAsync(
				querries.startDate,
				querries.endDate,
				querries.userId?.toString(),
				querries.request,
			)

			const transformedLogs: Response = logs.hits.hits.map(l => {
				const log = (l as LogDocument)._source
				return {
					method: log.fields.method,
					url: log.fields.url,
					responseTime: log.fields.responseTime,
					...JSON.parse(log.fields.responseBody),
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
