import { StatusCodes } from 'http-status-codes'

import { ServiceResponse } from '@/common/models/serviceResponse'

export class RandomImageService {
	async getRandomImage(width?: string, height?: string): Promise<ServiceResponse<null> | Buffer> {
		try {
			const response = await fetch(`https://picsum.photos/${width ?? 500}/${height ?? 500}`)
			if (!response.ok) {
				return ServiceResponse.failure(`Failed to generate random image: ${response.statusText}`, null, response.status)
			}
			const arrayBuffer = await response.arrayBuffer()
			const imageBuffer = Buffer.from(arrayBuffer)
			return imageBuffer
		} catch (error) {
			const err = error as Error
			switch (err.message) {
				default:
					return ServiceResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR)
			}
		}
	}
}

export const randomImageService = new RandomImageService()
