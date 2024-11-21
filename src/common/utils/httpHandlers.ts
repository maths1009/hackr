import type { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import type { ZodError, ZodSchema } from 'zod'

import { ServiceResponse } from '@/common/models/serviceResponse'

export const handleServiceResponse = (
	//eslint-disable-next-line
	serviceResponse: ServiceResponse<any> | Buffer,
	response: Response,
) => {
	if (serviceResponse instanceof Buffer) {
		return response.status(StatusCodes.OK).setHeader('Content-Type', 'image/jpeg').send(serviceResponse)
	} else if (serviceResponse instanceof ServiceResponse) {
		return response
			.status(serviceResponse.statusCode)
			.setHeader('Content-Type', 'application/json')
			.send(serviceResponse)
	}
}

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
	try {
		schema.parse({ body: req.body, query: req.query, params: req.params })
		next()
	} catch (err) {
		const errorMessage = `Invalid input: ${(err as ZodError).errors.map(e => `${e.path.join('.')} = ${e.message}`).join(', ')}`
		const statusCode = StatusCodes.UNPROCESSABLE_ENTITY
		const serviceResponse = ServiceResponse.failure(errorMessage, null, statusCode)
		return handleServiceResponse(serviceResponse, res)
	}
}
