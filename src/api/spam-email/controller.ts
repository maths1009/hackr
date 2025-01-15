import { Request, RequestHandler, Response } from 'express'

import { handleServiceResponse } from '@/common/utils/httpHandlers'

import { Querries } from './model'
import { spamEmailService } from './service'

class SpamEmailController {
	public spam: RequestHandler<object, object, object, Querries> = async (
		req: Request<object, object, object, Querries>,
		res: Response,
	) => {
		const serviceResponse = await spamEmailService.spam(
			req.query.to,
			req.query.count as unknown as number,
			req.query.subject,
			req.query.body,
		)
		return handleServiceResponse(serviceResponse, res)
	}
}

export const spamEmailController = new SpamEmailController()
