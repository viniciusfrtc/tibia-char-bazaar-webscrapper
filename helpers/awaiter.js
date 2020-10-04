const randomNumber = require(`random-number`)

var intervalGenerator = randomNumber.generator({
	min: 1800,
	max: 2500,
	integer: true,
})

module.exports = {
    awaitForAWhile: (ms = intervalGenerator()) => new Promise(resolve => setTimeout(() => resolve(), ms)),
}