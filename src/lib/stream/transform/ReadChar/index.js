const ReadChar = require('./ReadChar')
const Position = require('./Position')
const Char = require('./Char')

function readChar() {
  return new ReadChar()
}

module.exports = {
  ReadChar,
  readChar,
  Position,
  Char
}
