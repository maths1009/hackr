import { env } from '@/common/utils/envConfig'
import { app, logger } from '@/server'

const server = app.listen(env.PORT, () => {
	const { NODE_ENV, HOST, PORT } = env
	console.info(`Server (${NODE_ENV}) running on http://${HOST}:${PORT}`)
})

const onCloseSignal = () => {
	console.info('sigint received, shutting down')
	server.close(() => {
		logger.info('server closed')
		process.exit()
	})
	setTimeout(() => process.exit(1), 10000).unref()
}

process.on('SIGINT', onCloseSignal)
process.on('SIGTERM', onCloseSignal)
