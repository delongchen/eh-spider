const allJson = 'allJson'

function classify(all, container = {}, cb) {
  if (!cb) {
    if (!Array.isArray(container[allJson]))
      container[allJson] = []
  }
  const defaultAllContainer = container[allJson]
  for (const i of all) {
    const {type, json} = i;
    (container[type] || (container[type] = [])).push(json)
    if (!cb) defaultAllContainer.push(json)
    else cb(json)
  }
  return container
}


module.exports = {
  classify
}
