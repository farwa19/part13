const redis = require('redis')
const { REDIS_URL } = require('../util/config')

let set
let get
let increment
let getCount

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  set = redisIsDisabled
  get = redisIsDisabled
  increment = redisIsDisabled
  getCount = redisIsDisabled
} else {
  const client = redis.createClient({
    url: REDIS_URL
  })

  client.on('error', (err) => console.log('Redis Client Error', err))
  
  client.connect().then(() => {
    console.log('Connected to Redis')
  })
    
  get = (...args) => client.get(...args)
  set = (...args) => client.set(...args)
  increment = (key = 'todos:added') => client.incr(key)
  getCount = async (key = 'todos:added') => Number(await client.get(key) || 0)
}

module.exports = {
  get,
  set,
  increment,
  getCount,
}
