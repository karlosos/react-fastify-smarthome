const axios = require('axios')

module.exports = function (instance, opts, next) {
  instance.get('/health-check', async (request, reply) => {
    let payload = { message: 'OK' }
    const gatewayUrl = opts.GATEWAY_URL
    const timeout = setTimeout(() => {
      reply.code(504)
      payload = { error: '504 Gateway Timeout' }
    }, 4000)

    await axios.get(`${gatewayUrl}`, {
      withCredentials: true,
      headers: {
        Cookie: `${opts.COOKIE_NAME}=${opts.COOKIE_VALUE}`
      }
    })
      .then(() => { clearTimeout(timeout) })
      .catch(() => {
        clearTimeout(timeout)
        reply.code(502)
        payload = { error: '502 Bad Gateway' }
      })

    reply.send(payload)
  })
  next()
}
