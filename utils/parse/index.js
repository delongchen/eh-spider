function parseStyle(style) {
  if (!style) return {}
  const result = {}
  style.split(';').forEach(value => {
    const [k, v] = value.split(':')
    result[k] = v
  })
  return result
}

module.exports = {
  parseStyle
}
