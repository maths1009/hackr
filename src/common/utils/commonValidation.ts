import { z } from 'zod'

export const commonValidations = {
	id: z
		.string()
		.refine(data => !Number.isNaN(Number(data)), 'ID must be a numeric value')
		.transform(Number)
		.refine(num => num > 0, 'ID must be a positive number'),
	// ... other common validations
}

export const validDate = (field: string) =>
	z.string().refine(
		date => {
			const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
			return iso8601Regex.test(date) && !isNaN(Date.parse(date))
		},
		{
			message: `${field} must be a valid date in ISO 8601 format`,
		},
	)
