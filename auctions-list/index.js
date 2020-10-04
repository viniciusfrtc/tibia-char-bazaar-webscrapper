
const {getAuctionPageData} = require('./scrapper')
const {getAuctionByAuctionId, insertAuction} = require('../db/mongo/auctions-collection')
const {getLastScrappingTime, updateLastScrappingTime} = require('../db/mongo/scrapping-history-collection')
const {awaitForAWhile} = require('../helpers/awaiter')
const {
	getHoursDifferenceFromNow, 
	isBeforeFrom,
	subtractHoursFromNow,
} = require('../helpers/date-utils') 
const {
	DATES: {
		TIME_WINDOW_MULTIPLIER,
	},
} = require('../helpers/constants')

let scrappingTimeThreshold

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
		if (isBeforeFrom(auction.endTime, scrappingTimeThreshold)) {
			console.log('last auction has reached the date threshold, therefore scrapping is done for now')
			return updateLastScrappingTime()
		}
	}

	console.log('awaiting a bit :shrug:')
	await awaitForAWhile()

	pageId += 1
	console.log(`Let's parse page ${pageId} now`)
	return parseAndSaveAuctionsList(pageId)

}

;(async () => {
	const lastScrappingTime = await getLastScrappingTime()
	const hoursFromLastScrapping = getHoursDifferenceFromNow(lastScrappingTime)
	scrappingTimeThreshold = subtractHoursFromNow(
		Math.ceil(hoursFromLastScrapping * TIME_WINDOW_MULTIPLIER)
	)
	await parseAndSaveAuctionsList(1)
	process.exit(0)
})()


