const mysql = require('mysql')
const config = require('../config')

const POOL = mysql.createPool(config)

class DBConnector {
  static query(sql, data) {
    return new Promise((resolve, reject) => {
      POOL.query(sql, [data], (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
      })
    })
  }

  static insert_one(data) {
    return this.query('insert into st (id, type, json) values ?', data)
  }

  static select(sql) {
    return this.query(sql)
  }

  static close() {
    return new Promise((resolve, reject) => {
      POOL.end(err => {
        (err ? reject : resolve)()
      })
    })
  }
}

module.exports = DBConnector
