const logger = require('./logger')
const helper = require('./util/helper')
const formatter = require('../validator/formatter')
//Module-1
logger.log('Irshad Ahmad')
logger.welcome()
console.log('Here is url'+logger.url)
//Module-2
helper.printDate()
helper.printMonth()
helper.getBatchInfo()
//Module-3
formatter.trimString()
formatter.changetoLowerCase()
formatter.changetoUpperCase()
