const configure = require('./configure')

const config = configure()


if (process.env.NODE_ENV === 'test') {
  try {
    
    const redisMock = require('redis-mock')
    const db = redisMock.createClient()
    module.exports = db
    return
  } catch (e) {
   
    const store = new Map()

    const db = {
     
      connected: true,
      flushdb: (cb) => {
        store.clear()
        if (cb) cb(null, 'OK')
      },
      exists: (key, cb) => {
        cb(null, store.has(key) ? 1 : 0)
      },
      hmset: (key, obj, cb) => {
        store.set(key, Object.assign({}, obj))
        if (cb) cb(null, 'OK')
      },
      hgetall: (key, cb) => {
        const v = store.get(key) || null
        cb(null, v)
      },
      quit: () => {},
     
      on: (ev, cb) => {},
      once: (ev, cb) => {},
      emit: (ev, ...args) => {},
    }

    module.exports = db
    return
  }
}


var redis = require('redis')
var db = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  retry_strategy: () => {
    return new Error('Retry time exhausted')
  }
})

process.on('SIGINT', function() {
  db.quit();
});

module.exports = db
