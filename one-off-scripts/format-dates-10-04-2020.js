/**
 * backup before this migration: backups/10-04-20_14:18:14
 * migration steps:
 * 1) copied through robomongo the auctions collection to migrations
 * 2) ran migrateAuctions function
 * 3) removed migrated flag from documents
 * 4) validated manually on robomongo that everything is fine
 * 5) deleted through robomongo original auctions collection and renamed migrations collection to auctions
 */

const {migrationsCollection} = require('../db/mongo/db-config')
const {formatDateToUTC} = require('../helpers/date-utils')

const getNextAuctionToMigrate = () =>
	migrationsCollection.findOne({
		migrated: {
			$exists: false,
		},
	})

const getNextAuctionToDeleteFlag = () =>
	migrationsCollection.findOne({
		migrated: {
			$exists: true,
		},
	})

const migrateAuction = async auction =>
	migrationsCollection.findOneAndUpdate({_id: auction._id}, {
		$set: {
			migrated: true,
			startTime: formatDateToUTC(auction.starTime),
			endTime: formatDateToUTC(auction.endTime),
		},
		$unset: {starTime: ''},
	})


const deleteFlag = async auction =>
	migrationsCollection.findOneAndUpdate({_id: auction._id}, {
		$unset: {migrated: ''},
	})

const migrateAuctions = async () => {
	const auctionToMigrate = await getNextAuctionToMigrate()
	if (auctionToMigrate){
		console.log(`migrating auction number ${auctionToMigrate.auctionId}`)
		await migrateAuction(auctionToMigrate)
		// eslint-disable-next-line no-unused-vars
		return migrateAuctions()
	}
}

const deleteFlags = async () => {
	const flagToDelete = await getNextAuctionToDeleteFlag()
	if (flagToDelete){
		console.log(
			`deleting flag from auction number ${flagToDelete.auctionId}`
		)
		await deleteFlag(flagToDelete)
		// eslint-disable-next-line no-unused-vars
		return deleteFlags()
	}
}

// // step 2
// ;(async () => {
//     await migrateAuctions()
//     process.exit(0)
// })()

// step 3
// ;(async () => {
//     await deleteFlags()
//     process.exit(0)
// })()
