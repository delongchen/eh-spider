const {createApp} = require('./app')

const { oneTask, run } = createApp({
  handler(data, result) {
    result.push([
      data.hashcode,
      data.tagName,
      JSON.stringify(data)
    ])
  }
})

run().then(() => {
  console.log('ok')
})
