import { esClient } from '@/server'
import SearchApi from '@elastic/elasticsearch/lib/api/api/search'

export class LogsRepository {
	async getLogsAsync(
		start: string,
		end: string,
		userId?: string,
		request?: string,
	): Promise<ReturnType<typeof SearchApi>> {
		console.log(userId, request)
		return await esClient.search({
			index: 'pino-logs',
			body: {
				query: {
					bool: {
						must: [
							{
								range: {
									time: {
										gte: start,
										lte: end,
										format: 'strict_date_optional_time',
									},
								},
							},
							...(userId
								? [
										{
											term: {
												userId: userId,
											},
										},
									]
								: []),
							...(request
								? [
										{
											prefix: {
												'request.url': request,
											},
										},
									]
								: []),
						],
					},
				},
			},
		})
	}
}

export const logsRepository = new LogsRepository()
