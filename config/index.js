const YAML = require('yaml')
const fs = require('fs')

function parseConfig() {
  return YAML.parse(
    fs.readFileSync('./database.yaml', 'utf8')
  )
}

const config = parseConfig()

module.exports = config
