const { HTMLParser } = require('./parseHTML')
const { getOne } = require('../../api')
const { parseIndexPage } = require('./parseIndexPage')

function createLoader(fn) {
  return function (promise, data) {
    const title = data.title.title
    if (!title) return Promise.resolve()

    return promise
      .then(
        () => parseIndexPage(data)
          .catch(reason => {
            console.log(reason.code)
          })
      )
      .then(value => {
        fn(data, title, value)
      })
  }
}

async function getOneTask(loadItemFn) {
  const html = await getOne()
  const loader = createLoader(loadItemFn)

  const p = new HTMLParser(html)
  const items = p.parsePopularPage()
  await items.reduce(loader, Promise.resolve())
}

module.exports = {
  getOneTask
}
