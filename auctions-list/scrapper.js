const puppeteer = require('puppeteer')
const {parseAuctionData} = require('./parser')

const getCurrentUrl = pageId =>
	// eslint-disable-next-line max-len
	`https://www.tibia.com/charactertrade/?subtopic=pastcharactertrades&currentpage=${pageId}`

const getAuctionPageData = async pageId => {

	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	await page.goto(getCurrentUrl(pageId), { waitUntil: 'networkidle0' })

	const auctionsToParse = await page.evaluate(() => {
		const auctionElements = document.querySelectorAll('div.Auction')
		const rawAuctions = []
		auctionElements.forEach(auctionElement => {
			const rawAuction = {
				rawName: auctionElement
					.querySelector('div.AuctionCharacterName').innerText,
				rawUrl: auctionElement
					.querySelector('div.AuctionCharacterName > a').href,
				rawStatus: auctionElement
					.querySelector('div.AuctionInfo').innerText,
				rawCharacterDetails: auctionElement
					.querySelector('div.AuctionHeader').innerText,
				rawAuctionDetails: auctionElement
					.querySelector('div.ShortAuctionData').innerText,
			}
			rawAuctions.push(rawAuction)
		})
		return rawAuctions
	})

	await browser.close()

	return auctionsToParse.map(parseAuctionData)
}

module.exports = {
	getAuctionPageData
}
