
const {getAuctionPageData} = require('./scrapper')
const {getAuctionByAuctionId, insertAuction} = require('../db/mongo/auctions-collection')
const {awaitForAWhile} = require('../helpers/awaiter')
const {APP: {PAGE_SCRAPPING_THRESHOLD}} = require('../helpers/constants')

const parseAndSaveAuctionsList = async (pageId = 1) => {
	console.log(`Getting auctions for page ${pageId}`)
	const auctions = await getAuctionPageData(pageId)
	for (const auction of auctions) {
		console.log(`trying to save auction ${auction.auctionId}`)
		const auctionExists = await getAuctionByAuctionId(auction.auctionId)
		if (!auctionExists) {
			console.log('saving auction')
			await insertAuction(auction)
		} else {
			console.log('auction already parsed')
		}
	}
	if (pageId < PAGE_SCRAPPING_THRESHOLD) {
		console.log('awaiting a bit :shrug:')
		await awaitForAWhile()
		pageId += 1
		console.log(`Let's parse page ${pageId} now`)
		return parseAndSavePage(pageId)
	}
}

;(async () => {
	await parseAndSaveAuctionsList(1)
})()


