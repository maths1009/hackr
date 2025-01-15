import * as puppeteer from 'puppeteer'

const scrapeGoogle = async (query: string, page: puppeteer.Page) => {
	const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`
	await page.goto(url, { waitUntil: 'networkidle2' })

	return await page.evaluate(() =>
		Array.from(document.querySelectorAll('.tF2Cxc')).map(result => ({
			title: result.querySelector('h3')?.textContent || '',
			link: result.querySelector('a')?.href || '',
			snippet: result.querySelector('.IsZvec')?.textContent || '',
		})),
	)
}

export const scrapeInfo = async (query: string) => {
	const browser = await puppeteer.launch({ headless: true })
	const page = await browser.newPage()

	try {
		const googleResults = await scrapeGoogle(query, page)

		await browser.close()
		return [...googleResults]
	} catch (error) {
		await browser.close()
		return { error: error instanceof Error ? error.message : String(error) }
	}
}
