const {getOneTask} = require('../core/parse')
const {hash, createExitHandler} = require('../utils/util')
const DB = require('../data/DBConnector')

function createApp(config) {
  const ID_SET = new Set()
  let CONFIG = {
    run: true,
  }

  function itemsFilter(items) {
    return items.filter(value => {
      const id = value[0]
      if (!ID_SET.has(id)) {
        ID_SET.add(id)
        return true
      }
      return false
    })
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
    const ids = await DB.select('select id from st')
    ids.forEach(id => {
      ID_SET.add(id.id)
    })

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
