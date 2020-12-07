const DB = require('./DBConnector')

DB.query('desc st')
  .then(({ result }) => {
    console.log(result)
  })
  .then(() => {
  })
