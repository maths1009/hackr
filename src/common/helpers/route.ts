export enum ROUTE {
	AUTH = '/auth',
	LOGIN = '/login',
	REGISTER = `/register`,
	LOGS = '/logs',
	PASSWORD = '/password',
	FAKE_IDENTITY = '/fake-identity',
}

export enum AUTH_ROUTE {
	LOGIN = `${ROUTE.AUTH}${ROUTE.LOGIN}`,
	REGISTER = `${ROUTE.AUTH}${ROUTE.REGISTER}`,
}
