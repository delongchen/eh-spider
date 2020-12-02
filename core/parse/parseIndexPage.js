const {Get} = require('../../utils/requests')
const cheerio = require('cheerio')

/**
 * @param {string[]} links
 */
async function getImgSrc(links) {
  const max = 10
  const result = []
  while (links.length) {
    const q = []
    for (let i = 0; i < max; i++) {
      q.push(links.shift())
      if (!links.length) break
    }
    result.push(...await getNImgSrc(q))
  }
  return result
}

function getNImgSrc(q) {
  return Promise.all(q.map(
    link => Get(link).then(
      value =>
        cheerio.load(value)('#img').attr('src')
    )
  ))
}

function parseIndexPage(info) {
  if (info.title.link)
    return Get(info.title.link).then(value => {
      const $ = cheerio.load(value)
      const result = $('#gdt .gdtm a').map(function (i, el) {
        return $(this).attr('href')
      }).get()
      return getImgSrc(result)
    }).catch(e => {
      console.log(e)
    })

  return []
}

module.exports = {
  parseIndexPage
}
