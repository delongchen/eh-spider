const {getOneTask} = require('../core/parse')
const {hash, createExitHandler} = require('../utils/util')
const DB = require('../data/DBConnector')
const {itemsFilter, initSet} = require('../data/ResultFilter')

function createApp(config) {
  const CONFIG = {
    run: true,
    pause: false,
    to_quit: false
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

  async function nextTick() {
    const time = 60
    CONFIG.pause = true
    let counter = 0

    while (CONFIG.pause) {
      await new Promise(resolve => {
        setTimeout(() => {
          if (!CONFIG.to_quit) counter++
          resolve()
        }, 1000)
      })

      if (counter === time) CONFIG.pause = false
    }
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
      await nextTick()
    }

    await DB.close()
  }

  return {
    run
  }
}

module.exports = {
  createApp,
}
