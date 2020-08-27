const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://qyhever.com/e-admin',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
}
