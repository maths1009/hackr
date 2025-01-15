import { Request, RequestHandler, Response } from 'express'

import { handleServiceResponse } from '@/common/utils/httpHandlers'

import { Querries } from './model'
import { verifPasswordService } from './service'

class VerifPasswordController {
	public verifEmail: RequestHandler<object, object, object, Querries> = async (
		req: Request<object, object, object, Querries>,
		res: Response,
	) => {
		const serviceResponse = await verifPasswordService.verifPassword(req.query.password)
		return handleServiceResponse(serviceResponse, res)
	}
}

export const verifPasswordController = new VerifPasswordController()
