const {getOneTask} = require('../core/parse')
const {hash, createExitHandler} = require('../utils/util')
const DB = require('../data/DBConnector')
const {itemsFilter, initSet} = require('../data/ResultFilter')
const {getSingleLineLogger} = require('../utils/logs')

function createApp(config) {
  const {
    dataHandler,
    beforeRun,
    beforeExit,
    nextTick,
    beforeInsert
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
    const one_tick_time = 1000
    const tick_num = 60 * 15
    const time = tick_num * one_tick_time
    const { print } = getSingleLineLogger(time, one_tick_time)

    CONFIG.pause = true
    let counter = 0

    while (CONFIG.pause) {
      await new Promise(resolve => {
        if (counter === tick_num) {
          CONFIG.pause = false
          resolve()
        }
        else {
          if (!CONFIG.to_quit) {
            print(one_tick_time)
            counter++
          }
          setTimeout(resolve, one_tick_time)
        }
      })
    }
  }

  async function run() {
    createExitHandler(CONFIG)
    initSet(await DB.select('select id from st'))

    beforeRun()
    while (CONFIG.run) {
      const raw = await oneTask()
      const toInsert = itemsFilter(raw)
      beforeInsert(toInsert)
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
