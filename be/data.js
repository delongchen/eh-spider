const mysql = require('mysql')
const config = require('../config')
const {ifNotError} = require('../utils/util')
const {classify} = require('./utils')

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

const dataStore = {}

async function init() {
  classify(await getAll(), dataStore)
}

module.exports = {
  init,
  dataStore
}

//init().then(value => {console.log(dataStore['Game CG'])})
