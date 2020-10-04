const moment = require('moment')
const {
    DATES: {
        BAZAAR_DAY_DATE_FORMAT,
        TIMEZONE_SUFFIX,
        AUCTIONS_LIST_DATE_THRESHOLD,
    },
} = require('./constants')

const auctionsListDateThreshold = moment().subtract(AUCTIONS_LIST_DATE_THRESHOLD, 'd').utc()

const convertToNumber = str => Number(str)

const formatDateToUTC = date => {
    const [day, time] = date.split(',')
    const parsedDay = moment(day, BAZAAR_DAY_DATE_FORMAT)
    const [hour, minutes] = time
        .replace(TIMEZONE_SUFFIX, '')
        .trim()
        .split(':')
        .map(convertToNumber)
    return parsedDay
        .add(hour, 'h')
        .add(minutes, 'm')
        .utc()
        .format()
}

const isBeforeFrom = (time, threshold) => {
    const parsedTime = moment(time).utc()
    const parsedThreshold = moment(threshold).utc()
    return parsedTime.isBefore(parsedThreshold)
}
const getNow = () => moment().utc().format()

const getHoursDifferenceFromNow = timeInPast => {
    const parsedTimeInPast = moment(timeInPast).utc()
    const now = moment().utc()
    const difference = moment.duration(now.diff(parsedTimeInPast)).asHours()
    return difference
}

const subtractHoursFromNow = hours => moment().utc().subtract(hours, 'h').format()

module.exports = {
    formatDateToUTC,
    isBeforeFrom,
    getNow,
    getHoursDifferenceFromNow,
    subtractHoursFromNow,
}