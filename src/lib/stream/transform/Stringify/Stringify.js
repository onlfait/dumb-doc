const { Transform } = require('stream')

class Stringify extends Transform {
  constructor() {
    super({ objectMode: true, highWaterMark: 1 })
  }

  _transform(data, encoding, callback) {
    const string = JSON.stringify(data, null, '  ')
    callback(null, `${string}\n`)
  }
}

module.exports = Stringify
