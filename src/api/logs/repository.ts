import { esClient } from '@/server'
import SearchApi from '@elastic/elasticsearch/lib/api/api/search'

export class LogsRepository {
	async getLogsAsync(
		start: string,
		end: string,
		userId?: string,
		request?: string,
	): Promise<ReturnType<typeof SearchApi>> {
		return await esClient.search({
			index: 'webservice-logs-*',
			size: 10,
			body: {
				query: {
					bool: {
						filter: [
							{
								range: {
									'@timestamp': {
										gte: start,
										lte: end,
										format: 'strict_date_optional_time',
									},
								},
							},
							...(userId ? [{ term: { 'fields.userId': userId } }] : []),
							...(request ? [{ match_phrase: { 'fields.url': request } }] : []),
						],
					},
				},
				sort: [
					{
						'@timestamp': {
							order: 'desc',
						},
					},
				],
			},
		})
	}
}

export const logsRepository = new LogsRepository()
