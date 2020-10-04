const {
    MONGO: {
        DB,
        CONNSTRING,
        AUCTIONS_COLLECTION,
    },
} = require('../../helpers/constants')
const db = require('monk')(`${CONNSTRING}/${dbName}`)

module.exports = {
    auctionsCollection: db.get(AUCTIONS_COLLECTION),
}