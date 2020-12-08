const {createApp} = require('./app')

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
    console.log(`fetch ${data.length} items`)
  }
})

run().then(() => {
  console.log('exited')
})
