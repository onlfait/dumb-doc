const Position = require('./Position')

class Char {
  constructor({ position, value } = {}) {
    this.position = new Position(position)
    this.value = value
  }
}

module.exports = Char
