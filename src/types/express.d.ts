import { Token } from '.'

declare global {
	namespace Express {
		interface Request {
			user?: Token
		}
	}
}
