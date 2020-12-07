const { axios } =  require("../utils/requests")

const ehApi = {
  popular: 'popular'
}

const getOne = () => axios({
  url: ehApi.popular,
  method: 'get'
}).catch(reason => {
  console.log(reason.code)
})

module.exports = {
  getOne
}
