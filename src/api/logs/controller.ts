import { Request, RequestHandler, Response } from 'express'

import { handleServiceResponse } from '@/common/utils/httpHandlers'

import { Querries } from './model'
import { logsService } from './service'

class LogsController {
	public getLogs: RequestHandler<object, object, object, Querries> = async (
		req: Request<object, object, object, Querries>,
		res: Response,
	) => {
		const serviceResponse = await logsService.getLogs(req.query)
		return handleServiceResponse(serviceResponse, res)
	}
}

export const logsController = new LogsController()
