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
    rl.question('确定要退出吗？',(answer)=>{
      if(answer.match(/^y(es)?$/i)) {
        flag.run = false
      }
      rl.pause();
    });
  })
}

module.exports = {
  hash,
  createExitHandler
}
