import { Request, RequestHandler, Response } from 'express'

import { handleServiceResponse } from '@/common/utils/httpHandlers'

import { LoginBody } from '../model/login.model'
import { authService } from '../service/login.service'

class LoginController {
	public login: RequestHandler = async (req: Request<object, object, LoginBody>, res: Response) => {
		const serviceResponse = await authService.login(req.body.email, req.body.password)
		return handleServiceResponse(serviceResponse, res)
	}
}

export const loginController = new LoginController()
