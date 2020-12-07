const {Get} = require('../../utils/requests')
const cheerio = require('cheerio')

/**
 * @param {string[]} links
 */
async function getImgs(links) {
  const max = 2
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
    link => Get(link).then(html => {
      const src = cheerio.load(html)('#img').attr('src')
      return src
    })
  ))
}

function parsePageNum(s) {
  const tmp = s.split(' ')
  const max = parseInt(tmp[3])
  const all = parseInt(tmp[5])

  if (all > max) {
    return Math.ceil(all / max) - 1
  }

  return 0
}

async function getIndexPage(link) {
  const html = await Get(link)
  const $ = cheerio.load(html)
  const pageNums = parsePageNum($('.gpc').text())
  const result = [$]
  for (let i = 1; i <= pageNums; i++) {
    result.push(cheerio.load(await Get(`${link}?p=${i}`)))
  }
  return result
}

function parseIndexHtml($) {
  return $('#gdt .gdtm a').map(function (i, el) {
    return $(this).attr('href')
  }).get()
}

async function parseIndexPage(info) {
  const link = info.title.link
  if (link) return info

  /*;(await getIndexPage(link))
  .forEach(html => {
    result.push(...parseIndexHtml(html))
  })*/

  //return await getImgs(result)
}

module.exports = {
  parseIndexPage
}
