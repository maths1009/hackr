import { Request, RequestHandler, Response } from 'express'

import { handleServiceResponse } from '@/common/utils/httpHandlers'

import { usersService } from './service'

class UsersController {
	public getAll: RequestHandler = async (_: Request, res: Response) => {
		const serviceResponse = await usersService.getAll()
		return handleServiceResponse(serviceResponse, res)
	}
}

export const usersController = new UsersController()
