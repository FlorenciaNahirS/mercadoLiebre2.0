const toThousand = require('./toThousand')

module.exports = (price, discount) => toThousand(price - (price * discount / 100).toFixed())