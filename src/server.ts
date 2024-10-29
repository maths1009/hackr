import cors from 'cors'
import express, { type Express } from 'express'
import helmet from 'helmet'
import { pino } from 'pino'
import pinoElastic from 'pino-elasticsearch'

import { openAPIRouter } from '@/api-docs/openAPIRouter'
import errorHandler from '@/common/middleware/errorHandler'
import rateLimiter from '@/common/middleware/rateLimiter'
import requestLogger from '@/common/middleware/requestLogger'
import { env } from '@/common/utils/envConfig'
import { Client } from '@elastic/elasticsearch'
import { PrismaClient } from '@prisma/client'

import { authRouter } from './api/auth/router'
import { logsRouter } from './api/logs/router'

// ELK
const esClient = new Client({ node: env.ELK_HOST })

// Logger
const streamToElastic = pinoElastic({
	index: 'pino-logs',
	node: env.ELK_HOST,
	esVersion: 8,
	flushBytes: 1000,
})

const logger = pino({ name: 'hackR log' }, streamToElastic)
const app: Express = express()

// DATABASE
const prisma = new PrismaClient()

app.set('trust proxy', true)

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }))
app.use(helmet())
app.use(rateLimiter)

// Request logging
app.use(...requestLogger({ logger: logger }))

// Routes
app.use('/auth', authRouter)
app.use('/logs', logsRouter)

// Swagger UI
app.use(openAPIRouter)

// Error handlers
app.use(errorHandler())

export { app, esClient, logger, prisma }
