import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { env } from '@/common/utils/envConfig'
import { ROLE, Token } from '@/types'

/**
 * Generates a JWT token for the given user ID.
 * @param userId - The ID of the user.
 * @returns The generated JWT token.
 */
export const generateToken = (id: number, role: ROLE) => {
	return jwt.sign({ id, role }, env.JWT_SECRET, {
		expiresIn: env.JWT_DURATION,
	})
}

/**
 * Checks the validity of a JWT token.
 * @param token - The JWT token to be checked.
 * @returns An object containing the decoded token and a flag indicating its validity.
 */
export const decodeToken = (token: string): Token | undefined => {
	try {
		return jwt.verify(token.split(' ')[1], env.JWT_SECRET) as Token
	} catch {
		return undefined
	}
}

/**
 * Hashes a password using bcrypt.
 * @param password - The password to be hashed.
 * @returns A promise that resolves to the hashed password.
 */
export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10)
	return bcrypt.hash(password, salt)
}

/**
 * Compares a plain text password with a hashed password.
 * @param password - The plain text password to compare.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A promise that resolves to a boolean indicating whether the passwords match.
 */
export const comparePassword = async (password: string, hashedPassword?: string) => {
	if (!hashedPassword) return false
	return bcrypt.compare(password, hashedPassword)
}
