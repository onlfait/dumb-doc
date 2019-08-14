const { Transform } = require('stream')
const Position = require('./Position')
const Char = require('./Char')

class ReadChar extends Transform {
  constructor() {
    super({ objectMode: true })
    this._position = new Position()
  }

  _incrementIndex() {
    this._position.index++
    this._position.column++
  }

  _incrementLine() {
    this._position.line++
    this._position.column = 0
  }

  _transform(data, encoding, callback) {
    const chars = data.toString().split('')
    chars.forEach(value => {
      if (value === '\r') {
        return // skip carriage return
      }
      this.push(new Char({ value, position: this._position }))
      if (value === '\n') {
        this._incrementLine()
      }
      this._incrementIndex()
    })
    callback()
  }
}

module.exports = ReadChar
