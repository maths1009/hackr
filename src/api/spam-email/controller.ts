import { Request, RequestHandler, Response } from 'express'

import { handleServiceResponse } from '@/common/utils/httpHandlers'

import { Body } from './model'
import { spamEmailService } from './service'

class SpamEmailController {
	public spam: RequestHandler<object, object, Body> = async (req: Request<object, object, Body>, res: Response) => {
		const serviceResponse = await spamEmailService.spam(
			req.body.to,
			req.body.count as unknown as number,
			req.body.subject,
			req.body.body,
		)
		return handleServiceResponse(serviceResponse, res)
	}
}

export const spamEmailController = new SpamEmailController()
