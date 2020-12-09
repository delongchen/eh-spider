const mysql = require('mysql')
const config = require('../config')
const {ifNotError} = require('../utils/util')

const INETR = (context, fn, arg) => { //ifNotErrorThenResolve
  return new Promise((resolve, reject) => {
    const handle = ifNotError(resolve, reject)
    if (arg) context[fn](arg, handle)
    context[fn](handle)
  })
}

async function getAll() {
  const connection = mysql.createConnection(config)
  await INETR(connection, 'connect')
  const result = await INETR(connection, 'query', 'select * from st')
  await INETR(connection, 'end')
  return result
}

const dataStore = {
  allJson: [],
}

const dataProxy = {
  get(target, p, receiver) {
    const result = Reflect.get(target, p)
    return `[${result.join(',')}]`
  }
}

async function init() {
  const all = await getAll()
  for (const item of all) {
    const {type, json} = item
    dataStore.allJson.push(json)
    ;(dataStore[type] || (dataStore[type] = [])).push(json)
  }
}

const data = new Proxy(dataStore, dataProxy)

module.exports = {
  init,
  data
}
