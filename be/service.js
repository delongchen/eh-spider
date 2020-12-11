const {dataStore, init} = require('./data')
const {classify} = require('./utils')

const DirtyTable = new Proxy({}, {
  get(target, p, receiver) {
    return (target[p] || (target[p] = { dirty: true }))
  },
  set(target, p, value, receiver) {
    const item = target[p]
    item.dirty = false
    item.text = value
  }
})

const dataProxy = {
  get(target, p) {
    const result = target[p]
    if (!result) return '[]'
    const dirtyInfo = DirtyTable[p]
    if (dirtyInfo.dirty) {
      DirtyTable[p] = `[${result ? result.join(',') : ''}]`
    }
    return dirtyInfo.text
  },
  set(target, p, v) {
    if (!Array.isArray(v)) return
    if (p === 'allJson') {
      const types = classify(v, target)
      if (types.size === 0) return
      for (const i of types)
        DirtyTable[i].dirty = true
    }
  }
}

const Store = new Proxy(dataStore, dataProxy)

module.exports = {
  Store,
  init
}
