const Axios = require('axios')

const ehAxios = Axios.create({
  baseURL: 'https://e-hentai.org/',
  timeout: 10000,
})

const baseAxios = Axios.create({
  timeout: 10000
})

baseAxios.interceptors.response.use(value => value.data)

ehAxios.interceptors.response.use(value => value.data)

module.exports = {
  axios: ehAxios,
  Get(url) {
    return baseAxios.get(url)
      .catch(reason => {
        console.log('get error')
        return 'error'
      })
  },
  Post(config) {
    return baseAxios.post(config)
  }
}
