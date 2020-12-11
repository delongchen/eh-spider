const YAML = require('yaml')
const fs = require('fs')

function parseConfig() {
  return YAML.parse(
    fs.readFileSync('./config/database.yaml', 'utf8')
  )
}

const config = parseConfig()

module.exports = config
