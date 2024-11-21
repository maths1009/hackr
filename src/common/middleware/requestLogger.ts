import type { Request, RequestHandler, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { randomUUID } from 'node:crypto'

import { logger } from '@/server'

import { decodeToken } from '../utils/auth'

enum LogLevel {
	Error = 'error',
	Warn = 'warn',
	Info = 'info',
	Debug = 'debug',
}

const genReqId = (req: Request) => req.headers['x-request-id'] || randomUUID()

const customProps = (req: Request, res: Response) => {
	const authHeader = req.headers.authorization
	const tokenData = authHeader ? decodeToken(authHeader) : null

	return {
		requestId: res.locals.requestId,
		method: req.method,
		url: req.originalUrl,
		statusCode: res.statusCode,
		userId: tokenData?.id,
		responseTime: `${Date.now() - (res.locals.startTime || Date.now())}ms`,
		responseBody: res.locals.responseBody instanceof Buffer ? 'Buffer' : res.locals.responseBody,
	}
}

const determineLogLevel = (res: Response): LogLevel => {
	if (res.statusCode >= StatusCodes.INTERNAL_SERVER_ERROR) return LogLevel.Error
	else if (res.statusCode >= StatusCodes.BAD_REQUEST) return LogLevel.Warn
	else return LogLevel.Info
}

const requestLogger: RequestHandler = (req, res, next) => {
	res.locals.startTime = Date.now()
	res.locals.requestId = genReqId(req)
	res.on('finish', () =>
		logger.log(determineLogLevel(res), `${req.method} ${req.originalUrl} - ${res.statusCode}`, customProps(req, res)),
	)
	next()
}

export default requestLogger
