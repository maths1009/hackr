import { esClient } from '@/server'
import SearchApi from '@elastic/elasticsearch/lib/api/api/search'

export class LogsRepository {
	async getLogsAsync(start: string, end: string): Promise<ReturnType<typeof SearchApi>> {
		return await esClient.search({
			index: 'pino-logs',
			body: {
				query: {
					range: {
						time: {
							gte: start,
							lte: end,
							format: 'strict_date_optional_time',
						},
					},
				},
			},
		})
	}
}

export const logsRepository = new LogsRepository()
