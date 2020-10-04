module.exports = {
    VOCATIONS: {
        ELITE_KNIGHT: 'elite knight',
        MASTER_SORCERER: 'master sorcerer',
        ELDER_DRUID: 'elder druid',
        ROYAL_PALADIN: 'royal paladin',
        KNIGHT: 'knight',
        SORCERER: 'sorcerer',
        DRUID: 'druid',
        PALADIN: 'paladin',
    },
    GENDERS: {
        MALE: 'male',
        FEMALE: 'female',
    },
    PARSER: {
        LEVEL_PREFIX: 'level: ',
        VOCATION_PREFIX: 'vocation: ',
        WORLD_PREFIX: 'world: ',
        AUCTION_ID_PREFIX: 'auctionid',
        START_DATE_PREFIX: 'auction start:',
        END_DATE_PREFIX: 'auction end:',
        BID_SUFFIX: 'bid:',
        HAD_BID_KEYWORD: 'winning',
    },
    APP: {
        BID_STATUS: {
            HAD_BID: 'had_bid',
            NO_BID: 'no_bid',
        },
        PAGE_SCRAPPING_THRESHOLD: 1000,
    },
    MONGO: {
        CONNSTRING: 'localhost',
        DB: 'char-bazaar',
        AUCTIONS_COLLECTION: 'auctions',
    }
}