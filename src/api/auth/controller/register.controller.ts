import { Request, RequestHandler, Response } from 'express'

import { handleServiceResponse } from '@/common/utils/httpHandlers'

import { RegisterBody } from '../model/register.model'
import { registerService } from '../service/register.service'

class RegisterController {
	public register: RequestHandler = async (req: Request<object, object, RegisterBody>, res: Response) => {
		const serviceResponse = await registerService.register(
			req.body.name,
			req.body.email,
			req.body.password,
			req.body.roleId,
		)
		return handleServiceResponse(serviceResponse, res)
	}
}

export const registerController = new RegisterController()
