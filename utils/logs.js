const slog = require('single-line-log')

const print_one = slog.stdout

function getSingleLineLogger(all, one_tick) {
  const SIZE = 50
  const empty = '░'
  const fulfill = '█'
  const bar = (new Array(SIZE)).fill(empty)
  let now = 0, counter = 0

  function print(n) {
    counter += n
    const toAdd = Math.floor((counter / all) * 50) - now
    for (let i = 0; i < toAdd; i++) bar[now++] = fulfill
    print_one(`等待：${all / one_tick}s ${bar.join('')} ${counter / one_tick}`)
  }

  return {
    print
  }
}

module.exports = {
  getSingleLineLogger
}
