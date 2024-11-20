import { CrtResult } from './types'

export const getSubdomainsFromCert = (domains: CrtResult[]): string[] => [
	...new Set(domains.flatMap(entry => entry.name_value.split('\n').map(name => name.trim()))),
]
