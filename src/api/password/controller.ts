import { Request, RequestHandler, Response } from 'express'

import { handleServiceResponse } from '@/common/utils/httpHandlers'

import { Querries } from './model'
import { passwordService } from './service'

class PasswordController {
	public generatePassword: RequestHandler<object, object, object, Querries> = async (
		req: Request<object, object, object, Querries>,
		res: Response,
	) => {
		const serviceResponse = await passwordService.getPassword(req.query)
		return handleServiceResponse(serviceResponse, res)
	}
}

export const passwordController = new PasswordController()
