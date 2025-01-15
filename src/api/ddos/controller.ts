import { Request, RequestHandler, Response } from 'express'

import { handleServiceResponse } from '@/common/utils/httpHandlers'

import { Querries } from './model'
import { ddosService } from './service'

class DdosController {
	public ddos: RequestHandler<object, object, object, Querries> = async (
		req: Request<object, object, object, Querries>,
		res: Response,
	) => {
		const serviceResponse = await ddosService.ddos(req.query.target, req.query.count as unknown as number)
		return handleServiceResponse(serviceResponse, res)
	}
}

export const ddosController = new DdosController()
