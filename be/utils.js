const allJson = 'allJson'

function classify(all, container = {}, cb) {
  const types = new Set()
  if (!Array.isArray(all) || all.length === 0)
    return types

  if (!cb) {
    if (!Array.isArray(container[allJson]))
      container[allJson] = []
  }

  const defaultAllContainer = container[allJson]
  for (const i of all) {
    const {type, json} = i;
    types.add(type);
    (container[type] || (container[type] = [])).push(json)
    if (!cb) defaultAllContainer.push(json)
    else cb(json)
  }
  types.add('allJson')
  return types
}

function hasBody(headers) {
  return ['transfer-encoding', 'content-length']
    .some(value => value in headers)
}

function handlePost(request) {
  if (!hasBody(request.headers)) return Promise.resolve()
  return new Promise((resolve) => {
    const buffers = []
    request.on('data', chunk => {
      buffers.push(chunk)
    })
    request.on('end', () => {
      resolve(
        JSON.parse(
          Buffer.concat(buffers).toString()
        )
      )
    })
  })
}

module.exports = {
  classify,
  handlePost
}
