import { CHARACTERE_QUERRIES } from './constant'
import { Querries } from './model'

export const generatePassword = ({ length, caractereParams }: Querries): string => {
	const characterSets: Record<CHARACTERE_QUERRIES, string> = {
		[CHARACTERE_QUERRIES.NUMBERS]: '0123456789',
		[CHARACTERE_QUERRIES.LOWERCASE]: 'abcdefghijklmnopqrstuvwxyz',
		[CHARACTERE_QUERRIES.UPPERCASE]: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		[CHARACTERE_QUERRIES.SYMBOLS]: '!@#$%^&*()_+[]{}|;:,.<>?',
		[CHARACTERE_QUERRIES.SIMILAR_CHARACTERS]: 'il1Lo0O',
	}

	const activeSets = Object.values(caractereParams)
		.filter(value => value !== CHARACTERE_QUERRIES.SIMILAR_CHARACTERS)
		.map(value => characterSets[value as CHARACTERE_QUERRIES])
		.join('')

	const filteredSet = caractereParams.includes(CHARACTERE_QUERRIES.SIMILAR_CHARACTERS)
		? activeSets.replace(/[il1Lo0O]/g, '')
		: activeSets

	if (!filteredSet || length <= 0) return ''

	return Array.from({ length }, () => filteredSet[Math.floor(Math.random() * filteredSet.length)]).join('')
}
