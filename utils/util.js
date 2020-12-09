/**
 * @param {string} str
 * @param {number} seed
 * @return {number}
 */
const readline = require('readline')

function hash(str, seed) {
  const lenStr = str.length
  if (lenStr === 0) return '811c9dc5'

  let hval = seed || 0x811c9dc5

  for (let i = 0; i < lenStr; i++) {
    hval ^= str.charCodeAt(i)
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24)
  }

  return hval >>> 0
}

function createExitHandler(flag) {
  const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
  })
  rl.on('SIGINT', input => {
    flag.to_quit = true
    rl.question('确定要退出吗？',(answer)=>{
      if(answer.match(/^y(es)?$/i)) {
        flag.pause = false
        flag.run = false
        rl.close()
      }
      flag.to_quit = false
    });
  })
}

function ifNotError(fn, reject) {
  return function (err, data) {
    if (err) reject(err)
    else fn(data)
  }
}

module.exports = {
  hash,
  createExitHandler,
  ifNotError
}
