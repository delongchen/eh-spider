const ID_SET = new Set()

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

function initSet(rawData) {

}

module.exports = {
  itemsFilter,
  initSet
}
