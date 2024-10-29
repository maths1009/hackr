import { Request, RequestHandler, Response } from 'express'

import { handleServiceResponse } from '@/common/utils/httpHandlers'

import { Body } from './model'
import { logsService } from './service'

class LogsController {
	public getLogs: RequestHandler = async (req: Request<object, object, Body>, res: Response) => {
		const serviceResponse = await logsService.getLogs(req.body.start_date, req.body.end_date)
		return handleServiceResponse(serviceResponse, res)
	}
}

export const logsController = new LogsController()
