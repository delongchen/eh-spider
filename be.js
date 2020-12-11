const Koa = require('koa')
const router = require('./be/router')
const { init } = require('./be/service')
const config = require('./config')

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.set({
    'Access-Control-Allow-Origin': '*'
  })
  await next()
});

app
  .use(router.routes())
  .use(router.allowedMethods())

init().then(() => {
  app.listen(config.bePort);
  console.log('started')
})
