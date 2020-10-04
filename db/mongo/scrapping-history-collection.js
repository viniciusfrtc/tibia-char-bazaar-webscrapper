const {scrappingHistoryCollection} = require('./db-config')
const {getNow} = require('../../helpers/date-utils')

const getLastScrappingTime = async () => {
    const scrappedTimeDoc = await scrappingHistoryCollection.findOne({
        time: {
            $exists: true,
        },
    })
    return scrappedTimeDoc.time
}

const updateLastScrappingTime = () => {
    const scrappingTime = getNow()
    return scrappingHistoryCollection.findOneAndUpdate(
        {
            time: {
                $exists: true,
            }
        },
        {
            $set: {
                time: scrappingTime,
            },
        },
    )
}

module.exports = {
    getLastScrappingTime,
    updateLastScrappingTime,
}