import { Request, RequestHandler, Response } from 'express'

import { handleServiceResponse } from '@/common/utils/httpHandlers'

import { Querries } from './model'
import { randomImageService } from './service'

class RandomImageController {
	public generateRandomImage: RequestHandler<object, object, object, Querries> = async (
		req: Request<object, object, object, Querries>,
		res: Response,
	) => {
		const serviceResponse = await randomImageService.getRandomImage(req.query.width, req.query.height)
		return handleServiceResponse(serviceResponse, res)
	}
}

export const randomImageController = new RandomImageController()
