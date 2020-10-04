const {
    MONGO: {
        DB,
        CONNSTRING,
        AUCTIONS_COLLECTION,
        MIGRATIONS_COLLECTION,
        SCRAPPING_HISTORY_COLLECTION,
    },
} = require('../../helpers/constants')
const db = require('monk')(`${CONNSTRING}/${DB}`)

module.exports = {
    auctionsCollection: db.get(AUCTIONS_COLLECTION),
    scrappingHistoryCollection: db.get(SCRAPPING_HISTORY_COLLECTION),
    migrationsCollection: db.get(MIGRATIONS_COLLECTION),
}