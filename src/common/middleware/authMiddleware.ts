import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { decodeToken } from '@/common/utils/auth'
import { ROLE } from '@/types'

import { ServiceResponse } from '../models/serviceResponse'
import { handleServiceResponse } from '../utils/httpHandlers'

export const authMiddleware = (requiredRole: ROLE) => (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization

	if (!authHeader) {
		return handleServiceResponse(
			ServiceResponse.failure('Authorization header missing', null, StatusCodes.UNAUTHORIZED),
			res,
		)
	}

	const token = decodeToken(authHeader)

	if (!token) {
		return handleServiceResponse(ServiceResponse.failure('Invalid token', null, StatusCodes.UNAUTHORIZED), res)
	}

	req.user = token

	if (Object.values(ROLE).indexOf(token.role) > Object.values(ROLE).indexOf(requiredRole)) {
		return handleServiceResponse(ServiceResponse.failure('Insufficient role', null, StatusCodes.FORBIDDEN), res)
	}

	next()
}
