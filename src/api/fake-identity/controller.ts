import { Request, RequestHandler, Response } from 'express'

import { handleServiceResponse } from '@/common/utils/httpHandlers'

import { Querries } from './model'
import { fakeIdentityService } from './service'

class FakeIdentityController {
	public generateFakeIdentity: RequestHandler<object, object, object, Querries> = async (
		req: Request<object, object, object, Querries>,
		res: Response,
	) => {
		const serviceResponse = await fakeIdentityService.getPassword(req.query)
		return handleServiceResponse(serviceResponse, res)
	}
}

export const fakeIdentityController = new FakeIdentityController()
