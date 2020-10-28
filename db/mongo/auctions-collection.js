const {auctionsCollection} = require('./db-config')

const getAuctionByAuctionId = auctionId =>
	auctionsCollection.findOne({auctionId})

const insertAuction = auction => auctionsCollection.insert({
	...auction,
	auction_fully_parsed: false,
})

module.exports = {
	getAuctionByAuctionId,
	insertAuction,
}