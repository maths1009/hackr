import { Request, RequestHandler, Response } from 'express'

import { handleServiceResponse } from '@/common/utils/httpHandlers'

import { Querries } from './model'
import { verifEmailService } from './service'

class VerifEmailController {
	public verifEmail: RequestHandler<object, object, object, Querries> = async (
		req: Request<object, object, object, Querries>,
		res: Response,
	) => {
		const serviceResponse = await verifEmailService.verifEmail(req.query.email)
		return handleServiceResponse(serviceResponse, res)
	}
}

export const verifEmailController = new VerifEmailController()
