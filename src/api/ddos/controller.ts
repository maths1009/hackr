import { Request, RequestHandler, Response } from 'express'

import { handleServiceResponse } from '@/common/utils/httpHandlers'

import { Body } from './model'
import { ddosService } from './service'

class DdosController {
	public ddos: RequestHandler<object, object, Body> = async (req: Request<object, object, Body>, res: Response) => {
		const serviceResponse = await ddosService.ddos(req.body.target, req.body.count as unknown as number)
		return handleServiceResponse(serviceResponse, res)
	}
}

export const ddosController = new DdosController()
