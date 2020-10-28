const {
	PARSER: {
		LEVEL_PREFIX,
		VOCATION_PREFIX,
		WORLD_PREFIX,
		AUCTION_ID_PREFIX,
		START_DATE_PREFIX,
		END_DATE_PREFIX,
		BID_SUFFIX,
		HAD_BID_KEYWORD,
	},
	APP: {
		BID_STATUS: {
			HAD_BID,
			NO_BID,
		}
	},
	GENDERS,
} = require('../helpers/constants')
const {formatDateToUTC} = require('../helpers/date-utils')
const url = require('url')

const getCharacterName = rawName => rawName.trim().toLowerCase()

const getAuctionUrl = rawUrl => rawUrl.trim()

const getAuctionId = rawUrl => {
	const parsedUrl = url.parse(rawUrl)
	const [_, auctionId] = parsedUrl.query
		.split('&')
		.find(query => query.startsWith(AUCTION_ID_PREFIX))
		.split('=')
	return auctionId
}

const getAuctionStatus = rawStatus => rawStatus.replace(/(\r\n|\r|\n)/g, ' ')

const sanitizeCharacterDetails = rawCharacterDetails =>
	rawCharacterDetails
		.split('\n')[1]
		.split('|')
		.map(rawCharacterDetail => rawCharacterDetail.trim().toLowerCase())

const getCharacterLevel = rawCharacterDetails => {
	const levelRawString = rawCharacterDetails.find(rawDetail =>
		rawDetail.startsWith(LEVEL_PREFIX)
	)
	return levelRawString.substring(LEVEL_PREFIX.length)
}

const getCharacterVocation = rawCharacterDetails => {
	const vocationRawString = rawCharacterDetails.find(rawDetail =>
		rawDetail.startsWith(VOCATION_PREFIX)
	)
	return vocationRawString.substring(VOCATION_PREFIX.length)
}

const getCharacterGender = rawCharacterDetails =>
	rawCharacterDetails.find(rawDetail =>
		Object.values(GENDERS).includes(rawDetail.trim().toLowerCase())
	)


const getCharacterWorld = rawCharacterDetails => {
	const worldRawString = rawCharacterDetails.find(rawDetail =>
		rawDetail.startsWith(WORLD_PREFIX)
	)
	return worldRawString.substring(WORLD_PREFIX.length)
}

const getCharacterDetails = rawCharacterDetails => {
	const sanitizedRawCharacterDetails = sanitizeCharacterDetails(
		rawCharacterDetails
	)

	return {
		level: getCharacterLevel(sanitizedRawCharacterDetails),
		vocation: getCharacterVocation(sanitizedRawCharacterDetails),
		gender: getCharacterGender(sanitizedRawCharacterDetails),
		world: getCharacterWorld(sanitizedRawCharacterDetails),
	}
}

const sanitizeAuctionDetails = rawAuctionDetails =>
	rawAuctionDetails
		.split('\n')
		.map(rawAuctionDetail => rawAuctionDetail.trim().toLowerCase())

const getAuctionStartTime = rawAuctionDetails => {
	const startTimePrefixIndex = rawAuctionDetails.indexOf(START_DATE_PREFIX)
	return formatDateToUTC(rawAuctionDetails[startTimePrefixIndex + 1])
}

const getAuctionEndTime = rawAuctionDetails => {
	const endTimePrefixIndex = rawAuctionDetails.indexOf(END_DATE_PREFIX)
	return formatDateToUTC(rawAuctionDetails[endTimePrefixIndex + 1])
}

const getAuctionFinalStatus = rawAuctionDetails => {
	const [finalStatus] = rawAuctionDetails
		.find(detail => detail.endsWith(BID_SUFFIX))
		.split(' ')
	return finalStatus === HAD_BID_KEYWORD
		? HAD_BID
		: NO_BID
}

const getAuctionShownAmount = rawAuctionDetails =>
	rawAuctionDetails.find(detail => {
		const parsedNumber = Number(detail.replace(/,/g, ''))
		return Number.isSafeInteger(parsedNumber)
	})


const getAuctionDetails = rawAuctionDetails => {
	const sanitizedRawAuctionDetails = sanitizeAuctionDetails(rawAuctionDetails)

	return {
		startTime: getAuctionStartTime(sanitizedRawAuctionDetails),
		endTime: getAuctionEndTime(sanitizedRawAuctionDetails),
		finalStatus: getAuctionFinalStatus(sanitizedRawAuctionDetails),
		shownAmount: getAuctionShownAmount(sanitizedRawAuctionDetails),
	}
}

const parseAuctionData = ({
	rawName,
	rawUrl,
	rawStatus,
	rawCharacterDetails,
	rawAuctionDetails,
}) => {
	const {
		level,
		vocation,
		gender,
		world,
	} = getCharacterDetails(rawCharacterDetails)
	const {
		startTime,
		endTime,
		shownAmount,
		finalStatus,
	} = getAuctionDetails(rawAuctionDetails)
	return {
		name: getCharacterName(rawName),
		url: getAuctionUrl(rawUrl),
		auctionId: getAuctionId(rawUrl),
		status: getAuctionStatus(rawStatus),
		level,
		vocation,
		gender,
		world,
		startTime,
		endTime,
		shownAmount,
		finalStatus,
	}
}


module.exports = {
	parseAuctionData,
}
