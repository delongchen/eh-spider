const Router = require('koa-router')
const {Store} = require('./service')
const {handlePost} = require('./utils')

const root = new Router()

root
  .get('/', async (ctx) => {
    ctx.body = Store['allJson']
  })
  .post('/update', async (ctx) => {
    Store.allJson = await handlePost(ctx.req)
    ctx.body = {status: true}
  })
  .get('/types', async ctx => {
    const {type} = ctx.query
    ctx.body = type ? Store[type] : {msg: 'error'}
  })

module.exports = root
