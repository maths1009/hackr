import dotenv from 'dotenv'
import { cleanEnv, host, num, port, str } from 'envalid'

dotenv.config()

export const env = cleanEnv(process.env, {
	NODE_ENV: str({
		default: 'development',
		choices: ['development', 'production', 'test'],
	}),
	HOST: host({ devDefault: 'localhost' }),
	PORT: port({ devDefault: 3000 }),
	CORS_ORIGIN: str({ devDefault: 'http://localhost:*' }),
	COMMON_RATE_LIMIT_MAX_REQUESTS: num({ default: 1000 }),
	COMMON_RATE_LIMIT_WINDOW_MS: num({ default: 60000 }),
	DATABASE_URL: str({ devDefault: 'mysql://root:root@localhost:3306/test?schema=public' }),
	JWT_SECRET: str({ devDefault: 'secretdev' }),
	JWT_DURATION: str({ devDefault: '1h' }),
	ELK_HOST: str({ devDefault: 'http://localhost:9200' }),
	MAILJET_API_KEY: str({ devDefault: 'mailjetapikey' }),
	MAILJET_SECRET_KEY: str({ devDefault: 'mailjetsecretkey' }),
	FROM_EMAIL: str({ devDefault: '' }),
})
