const {createApp} = require('./app')
const {Post} = require('./utils/requests')
const config = require('./config')

const { run } = createApp({
  dataHandler(data, result) {
    result.push([
      data.hashcode,
      data.tagName,
      JSON.stringify(data)
    ])
  },
  beforeExit() {
    console.log('exiting...')
  },
  beforeRun() {
    console.log('初始化完毕...')
  },
  nextTick() {
    console.log('enter next tick')
  },
  beforeInsert(data) {
    Post({
      url: `http://localhost:${config.bePort}/update`,
      data: {}
    }).then(value => {

    })
    console.log(`fetch ${data.length} items`)
  }
})

run().then(() => {console.log('exited')})
