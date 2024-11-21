import { RequestHandler } from 'express'

const responseBody: RequestHandler = (_req, res, next) => {
	const originalSend = res.send

	res.send = function (body) {
		res.locals.responseBody = body
		return originalSend.call(this, body)
	}

	next()
}

export default responseBody
