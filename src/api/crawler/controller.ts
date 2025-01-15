import { Request, RequestHandler, Response } from 'express'

import { handleServiceResponse } from '@/common/utils/httpHandlers'

import { Querries } from './model'
import { crawlerService } from './service'

class CrawlerController {
	public verifEmail: RequestHandler<object, object, object, Querries> = async (
		req: Request<object, object, object, Querries>,
		res: Response,
	) => {
		const serviceResponse = await crawlerService.crawler(req.query.q)
		return handleServiceResponse(serviceResponse, res)
	}
}

export const crawlerController = new CrawlerController()
