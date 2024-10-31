export enum AUTH_ROUTE {
	LOGIN = '/login',
	REGISTER = '/register',
}

export enum ROUTE {
	AUTH = '/auth',
    LOGIN = `${ROUTE.AUTH}${AUTH_ROUTE.LOGIN}`,
    REGISTER = `${ROUTE.AUTH}${AUTH_ROUTE.REGISTER}`,
	LOGS = '/logs',
	PASSWORD = '/password',
}
