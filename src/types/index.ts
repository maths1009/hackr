//! Order is important, because it defines the order of priority of the roles
export enum ROLE {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export type Token = {
	id: string
	role: ROLE
}
