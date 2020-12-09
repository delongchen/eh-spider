const {dataStore, init} = require('./data')
const {classify} = require('./utils')

const dirtyTable = {
  allJson: {
    dirty: false
  }
}

const dataProxy = {
  get(target, p, receiver) {
    const result = Reflect.get(target, p)
    return `[${result ? '': result.join(',')}]`
  },
  set(target, p, v, receiver) {
    if (!Array.isArray(v)) return
    const all = 'allJson'
    const allJsonContainer = target[all]
    if (p === all) {
      const types = classify(v, {}, json => {

      })
    }
  }
}
