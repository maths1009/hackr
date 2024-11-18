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
import { fakeIdentityRouter } from './api/fake-identity/router'
import { logsRouter } from './api/logs/router'
import { passwordRouter } from './api/password/router'
import { ROUTE } from './common/helpers/route'

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

// App
const app: Express = express()

// DATABASE
const prisma = new PrismaClient()

// Trust proxy
app.set('trust proxy', true)

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }))
app.use(helmet())
app.use(rateLimiter)

// Request logging
//! Disable the route here because after applying the requestLogger route, the request is already logged, I know middleware would be a better approach
app.use(...requestLogger({ logger: logger, blacklistedRoutes: [ROUTE.LOGS] }))

// Routes
app.use(ROUTE.AUTH, authRouter)
app.use(ROUTE.LOGS, logsRouter)
app.use(ROUTE.PASSWORD, passwordRouter)
app.use(ROUTE.FAKE_IDENTITY, fakeIdentityRouter)

// Swagger UI
app.use(openAPIRouter)

// Error handlers
app.use(errorHandler())

export { app, esClient, logger, prisma }
