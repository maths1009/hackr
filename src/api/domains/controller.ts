import { Request, RequestHandler, Response } from 'express'

import { handleServiceResponse } from '@/common/utils/httpHandlers'

import { Querries } from './model'
import { domainsService } from './service'

class DomainsController {
	public generateDomains: RequestHandler<object, object, object, Querries> = async (
		req: Request<object, object, object, Querries>,
		res: Response,
	) => {
		const serviceResponse = await domainsService.getDomains(req.query)
		return handleServiceResponse(serviceResponse, res)
	}
}

export const domainsController = new DomainsController()
