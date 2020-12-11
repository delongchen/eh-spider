const Koa = require('koa')
const router = require('./router')
const { init } = require('./service')

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
  app.listen(3000);
  console.log('started')
})
