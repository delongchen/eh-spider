const {createApp} = require('./app')

const { run } = createApp({
  dataHandler(data, result) {
    result.push([
      data.hashcode,
      data.tagName,
      JSON.stringify(data)
    ])
  },
  beforeExit() {},
  beforeRun() {},
  nextTick() {
    console.log('next')
  }
})

run().then(() => {
  console.log('ok')
})
