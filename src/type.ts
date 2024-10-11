export enum ROLE {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export type Token = {
	id: string
	role: ROLE
}
