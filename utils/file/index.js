const fs = require('fs')

function writeFile(name, f) {
  return new Promise((resolve, reject) => {
    fs.writeFile(name, JSON.stringify(f), err => {
      if (err) reject(err)
      else resolve()
    })
  })
}

module.exports = {
  writeFile
}
