const { Transform } = require('stream')

class Stringify extends Transform {
  constructor() {
    super({ objectMode: true })
  }

  _transform(data, encoding, callback) {
    const string = JSON.stringify(data, null, '  ')
    callback(null, `${string}\n`)
  }
}

module.exports = Stringify
