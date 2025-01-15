import { faker } from '@faker-js/faker'

import { IDENTITY_QUERRIES } from './constant'
import { Querries } from './model'

export const generateFakeIdentity = ({ params }: Querries) =>
	params.reduce<Partial<Record<IDENTITY_QUERRIES, string | number | Date>>>((acc, query) => {
		acc[query] = {
			[IDENTITY_QUERRIES.FIRST_NAME]: () => faker.person.firstName(),
			[IDENTITY_QUERRIES.LAST_NAME]: () => faker.person.lastName(),
			[IDENTITY_QUERRIES.EMAIL]: () =>
				faker.internet.email({
					firstName: acc[IDENTITY_QUERRIES.FIRST_NAME] as string,
					lastName: acc[IDENTITY_QUERRIES.LAST_NAME] as string,
				}),
			[IDENTITY_QUERRIES.PHONE]: () => faker.phone.number(),
			[IDENTITY_QUERRIES.ADDRESS]: () => faker.location.streetAddress(),
			[IDENTITY_QUERRIES.COMPANY]: () => faker.company.name(),
			[IDENTITY_QUERRIES.JOB]: () => faker.person.jobTitle(),
			[IDENTITY_QUERRIES.AGE]: () => faker.number.int({ min: 18, max: 80 }),
			[IDENTITY_QUERRIES.BIRTHDAY]: () => faker.date.birthdate({}),
		}[query]?.()
		return acc
	}, {})
