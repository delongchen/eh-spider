const cheerio = require('cheerio')
const { parseStyle } = require('../../utils/parse')

function mark(style) {
  const p = parseStyle(style)['background-position']
  return p && (5 + parseInt(p.split(' ')[0]) / 16)
}

class HTMLParser {
  $ = null

  constructor(html) {
    this.$ = cheerio.load(html)
  }

  parsePopularPage() {
    const { $ } = this
    const context = this
    return $('tr').map((i, el) => {
      return {
        tagName: $('td.gl1c>.cn', el).text(),
        published: context._parsePublished($('td.gl2c', el)),
        title: context._parseTitle($('td.gl3c', el))
      }
    }).get()
  }

  _parsePublished(td) {
    const { $ } = this

    return {
      imgSrc: $('.glthumb img', td).attr('data-src'),
      download: $('.gldown a', td).attr('href'),
      time: '', /* todo */
      mark: mark($('.ir', td).attr('style'))
    }
  }

  _parseTitle(td) {
    const {$} = this
    return {
      link: $('a', td).attr('href'),
      title: $('.glink', td).text(),
      tags: $('.gt', td).map(function () {
        return $(this).text()
      }).get()
    }
  }
}

module.exports = {
  HTMLParser
}
