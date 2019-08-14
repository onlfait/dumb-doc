const Position = require('../ReadChar/Position')

class DocblockToken {
  constructor({ id, raw, value, position } = {}) {
    this.id = id
    this.raw = raw
    this.value = value
    this.position = {
      start: new Position(position.start),
      end: new Position(position.end)
    }
  }
}

module.exports = DocblockToken
