const ID_SET = new Set()

function addAll(data) {
  data.forEach(ID_SET.add, ID_SET)
}
/**
 * @param {Array} items
 */
function itemsFilter(items) {
  const idContainer = []

  const result = items.filter(value => {
    const id = value[0]
    if (!ID_SET.has(id)) {
      idContainer.push(id)
      return true
    }
  })

  if (result.length === items.length) {
    ID_SET.clear()
  }

  addAll(idContainer)

  return result
}

function initSet(rawData) {
  addAll(rawData.map(it => it.id))
}

module.exports = {
  itemsFilter,
  initSet
}
