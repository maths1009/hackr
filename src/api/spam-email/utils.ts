import mailjet from 'node-mailjet'

export const spamEmails = async (
	to: string,
	count: number,
	subject: string,
	body: string,
	apiKey: string,
	apiSecret: string,
	from: string,
) => {
	const mailjetClient = mailjet.apiConnect(apiKey, apiSecret)

	const messages = Array.from({ length: count }, () => ({
		From: { Email: from },
		To: [{ Email: to }],
		Subject: subject,
		TextPart: body,
	}))

	try {
		const response = await mailjetClient.post('send', { version: 'v3.1' }).request({ Messages: messages })
		console.log(response)

		//@ts-expect-error - This is a valid code
		return response.body.Messages.map(msg => ({ success: msg.Status === 'success' }))
	} catch (error: unknown) {
		return { success: false, error: error instanceof Error ? error.message : String(error) }
	}
}
