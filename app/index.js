const {getOneTask} = require('../core/parse')
const {hash, createExitHandler} = require('../utils/util')
const DB = require('../data/DBConnector')
const {itemsFilter, initSet} = require('../data/ResultFilter')

function createApp(config) {
  const {
    dataHandler,
    beforeRun,
    beforeExit,
    nextTick
  } = config

  const CONFIG = {
    run: true,
    pause: false,
    to_quit: false
  }

  async function oneTask() {
    const w = []
    await getOneTask((data, title, value) => {
      data.timestamp = Date.now()
      data.hashcode = hash(title)
      dataHandler(data, w)
    })
    return w
  }

  async function waitNextTick() {
    const time = 3600
    CONFIG.pause = true
    let counter = 0

    while (CONFIG.pause) {
      await new Promise(resolve => {
        setTimeout(() => {
          if (!CONFIG.to_quit) {
            console.log(`wait 1 second... all: ${time}`)
            counter++
          }
          resolve()
        }, 1000)
      })

      if (counter === time) CONFIG.pause = false
    }
  }

  async function run() {
    createExitHandler(CONFIG)
    initSet(await DB.select('select id from st'))

    beforeRun()
    while (CONFIG.run) {
      console.log('start run')
      const raw = await oneTask()
      const toInsert = itemsFilter(raw)
      console.log(`fetch ${toInsert.length} items`)
      await toInsert.reduce((promise, data) => {
        return promise
          .then(() =>
            DB.insert_one([data])
              .catch(reason => {
                console.log(reason.sqlMessage)
              })
          )
      }, Promise.resolve())
      nextTick()
      await waitNextTick()
    }
    await DB.close()
    beforeExit()
  }

  return {
    run
  }
}

module.exports = {
  createApp,
}
