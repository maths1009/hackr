import dns from 'dns'
import net from 'net'
import { promisify } from 'util'

import { env } from '@/common/utils/envConfig'

const resolveMx = promisify(dns.resolveMx)

export const getEmailSmtp = async (email: string): Promise<string | undefined> => {
	try {
		const domain = email.split('@')[1]
		if (!domain) return undefined
		const mxRecords = await resolveMx(domain)
		return mxRecords.sort((a, b) => a.priority - b.priority)[0].exchange
	} catch {
		return undefined
	}
}

export const verifyEmailSMTP = (email: string, smtpServer: string): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		const socket = net.createConnection(25, smtpServer)

		const commands = [`EHLO ${env.HOST}\r\n`, `MAIL FROM:<test@example.com>\r\n`, `RCPT TO:<${email}>\r\n`, `QUIT\r\n`]

		let currentStep = 0
		let emailValid = false

		const sendCommand = () => {
			if (currentStep < commands.length) {
				socket.write(commands[currentStep])
				currentStep++
			} else {
				socket.end()
			}
		}

		socket.on('connect', () => {
			sendCommand()
		})

		socket.on('data', data => {
			const response = data.toString()
			if (response.startsWith('250')) {
				if (currentStep === 3 && response.includes('OK')) {
					emailValid = true
				}
				sendCommand()
			} else if (response.startsWith('550') || response.startsWith('501') || response.startsWith('554')) {
				emailValid = false
				socket.end()
			}
		})

		socket.on('end', () => resolve(emailValid))
		socket.on('error', err => reject(err))
	})
}
