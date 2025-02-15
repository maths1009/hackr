import cors from 'cors'
import express, { type Express } from 'express'
import helmet from 'helmet'
import winston from 'winston'
import { ElasticsearchTransport, ElasticsearchTransportOptions } from 'winston-elasticsearch'

import { openAPIRouter } from '@/api-docs/openAPIRouter'
import errorHandler from '@/common/middleware/errorHandler'
import rateLimiter from '@/common/middleware/rateLimiter'
import { env } from '@/common/utils/envConfig'
import { Client } from '@elastic/elasticsearch'
import { PrismaClient } from '@prisma/client'

import { authRouter } from './api/auth/router'
import { crawlerRouter } from './api/crawler/router'
import { ddosRouter } from './api/ddos/router'
import { domainsRouter } from './api/domains/router'
import { fakeIdentityRouter } from './api/fake-identity/router'
import { logsRouter } from './api/logs/router'
import { passwordRouter } from './api/password/router'
import { randomImageRouter } from './api/random-image/router'
import { spamEmailRouter } from './api/spam-email/router'
import { usersRouter } from './api/users/router'
import { verifEmailRouter } from './api/verif-email/router'
import { verifPasswordRouter } from './api/verif-password/router'
import { ROUTE } from './common/helpers/route'
import responseBody from './common/middleware/responseBody'

// ELK
const esClient = new Client({ node: env.ELK_HOST })

// Logger
const esTransportOptions: ElasticsearchTransportOptions = {
	level: 'info',
	clientOpts: { node: env.ELK_HOST },
	indexPrefix: 'webservice-logs',
}
const esTransport = new ElasticsearchTransport(esTransportOptions)

const logger = winston.createLogger({
	format: winston.format.cli(),
	transports: [new winston.transports.Console(), esTransport],
})

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

app.use(responseBody)

// Routes
app.use(ROUTE.AUTH, authRouter)
app.use(ROUTE.LOGS, logsRouter)
app.use(ROUTE.PASSWORD, passwordRouter)
app.use(ROUTE.FAKE_IDENTITY, fakeIdentityRouter)
app.use(ROUTE.DOMAINS, domainsRouter)
app.use(ROUTE.RANDOM_IMAGE, randomImageRouter)
app.use(ROUTE.VERIF_EMAIL, verifEmailRouter)
app.use(ROUTE.VERIF_PASSWORD, verifPasswordRouter)
app.use(ROUTE.DDOS, ddosRouter)
app.use(ROUTE.SPAM_EMAIL, spamEmailRouter)
app.use(ROUTE.CRAWLER, crawlerRouter)
app.use(ROUTE.USERS, usersRouter)

// Swagger UI
app.use(openAPIRouter)

// Error handlers
app.use(errorHandler())

export { app, esClient, logger, prisma }
