const { getOne } = require('./api')
const { Parser, IndexParser } = require('./core/parse')
const fs = require('fs')

function writeFile(name, f) {
  return new Promise((resolve, reject) => {
    fs.writeFile(name, JSON.stringify(f), err => {
      if (err) reject(err)
      else resolve()
    })
  })
}
/*IndexParser({
  title: {
    link: 'https://e-hentai.org/g/1467025/01a6de26c5/'
  }
}).then(value => {
  console.log(value)
})*/
const w = []

function ttt(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

function loadItem(promise, data) {
  return promise
    .then(() => {
      console.log(data.title?.title)
      return IndexParser(data)
    })
    .then(value => {
      data.index = value
      w.push(data)
    })
}

getOne().then(html => {
  const p = new Parser(html)
  const items = p.parsePopularPage()
  return items.reduce(loadItem, Promise.resolve())
})
.then(value => {
  return writeFile(`${Date.now()}`, w)
}).then(() => {
  console.log('ok')
})
