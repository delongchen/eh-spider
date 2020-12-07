const {getOneTask} = require('../core/parse')
const {hash, createExitHandler} = require('../utils/util')
const DB = require('../data/DBConnector')
const {itemsFilter, initSet} = require('../data/ResultFilter')

function createApp(config) {
  let CONFIG = {
    run: true,
  }

  async function oneTask() {
    const w = []
    await getOneTask((data, title, value) => {
      //data.imgs = value
      data.timestamp = Date.now()
      data.hashcode = hash(title)
      config.handler(data, w)
    })
    return w
  }

  async function run() {
    createExitHandler(CONFIG)
    initSet(await DB.select('select id from st'))

    while (CONFIG.run) {
      console.log('task')
      const raw = await oneTask()
      const toInsert = itemsFilter(raw)
      await toInsert.reduce((promise, data) => {
        return promise
          .then(() =>
            DB.insert_one([data])
              .catch(reason => {
                console.log(reason.sqlMessage)
              })
          )
      }, Promise.resolve())

      await (new Promise(resolve => {
        setTimeout(resolve, 60000)
      }))
    }

    await DB.close()
  }

  return {
    oneTask,
    run
  }
}

module.exports = {
  createApp,
}
