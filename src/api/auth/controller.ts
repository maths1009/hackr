import { Request, RequestHandler, Response } from 'express'

import { handleServiceResponse } from '@/common/utils/httpHandlers'

import { AuthRegisterBodySchema } from './model'
import { authService } from './service'

class AuthController {
	public login: RequestHandler = async (req: Request, res: Response) => {
		const serviceResponse = await authService.login(req.body.email, req.body.password)
		return handleServiceResponse(serviceResponse, res)
	}

	public register: RequestHandler = async (req: Request, res: Response) => {
		const parseBody = AuthRegisterBodySchema.parse(req.body)
		const serviceResponse = await authService.register(
			parseBody.name,
			parseBody.email,
			parseBody.password,
			parseBody.roleId,
		)
		return handleServiceResponse(serviceResponse, res)
	}
}

export const authController = new AuthController()
