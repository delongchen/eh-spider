const { HTMLParser } = require('./parseHTML')
const { parseIndexPage } = require('./parseIndexPage')

module.exports = {
  Parser: HTMLParser,
  IndexParser: parseIndexPage
}
