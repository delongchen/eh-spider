/**
 * @param links
 */
async function asyncTest(links) {
  const max = 5
  const result = []
  while (links.length) {
    const q = []
    for (let i = 0; i < max; i++) {
      q.push(links.pop())
      if (!links.length) break
    }
    result.push(...await oneTask(q))
  }
  return result
}

function oneTask(q) {
  return Promise.all(q.map(
    link => new Promise(resolve => {
      const timeout = Math.floor((Math.random() * 200) + 2000)
      console.log(timeout)
      setTimeout(() => {
        resolve(link)
      }, timeout)
    })
  ))
}

asyncTest([
  'waht',
  'who',
  'dsa',
  'dqfaa',
  'asdaw',
  'gdfgr',
  'ryeddgd',
  'sdgferydxc',
  'sdfsefwa',
  'asdewfwetyu',
  'daaaaaa'
]).then(value => {
  console.log(value)
})
