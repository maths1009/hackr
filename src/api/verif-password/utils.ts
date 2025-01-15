import fs from 'fs'

export const isPasswordInFile = (word: string, filePath: string): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf-8', (err, data) => {
			if (err) return reject(err)
			const words = data.split('\n').map(w => w.trim().toLowerCase())
			resolve(words.includes(word.toLowerCase()))
		})
	})
}
