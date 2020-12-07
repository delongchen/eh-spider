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
    console.log('exit')
  },
  beforeRun() {
    console.log('初始化完毕。。。')
  },
  nextTick() {
    console.log('enter next tick')
  }
})

run().then(() => {
  console.log('ok')
})
