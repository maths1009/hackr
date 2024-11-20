export enum ROUTE {
	AUTH = '/auth',
	LOGIN = '/login',
	REGISTER = `/register`,
	LOGS = '/logs',
	PASSWORD = '/password',
	FAKE_IDENTITY = '/fake-identity',
	DOMAINS = '/domains',
	RANDOM_IMAGE = '/random-image',
}

export enum AUTH_ROUTE {
	LOGIN = `${ROUTE.AUTH}${ROUTE.LOGIN}`,
	REGISTER = `${ROUTE.AUTH}${ROUTE.REGISTER}`,
}
