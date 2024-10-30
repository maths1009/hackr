import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { checkToken } from '@/api/auth/utils'
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

	const { isValid, decodedToken } = checkToken(authHeader)

	if (!isValid) {
		return handleServiceResponse(ServiceResponse.failure('Invalid token', null, StatusCodes.UNAUTHORIZED), res)
	}

	req.user = decodedToken

	if (Object.values(ROLE).indexOf(decodedToken.role) > Object.values(ROLE).indexOf(requiredRole)) {
		return handleServiceResponse(ServiceResponse.failure('Insufficient role', null, StatusCodes.FORBIDDEN), res)
	}

	next()
}
