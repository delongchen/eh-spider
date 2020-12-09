const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
  await next()

})

app.use(async ctx => {
  ctx.set({
    'Access-Control-Allow-Origin': '*'
  })
});

app.listen(3000);
