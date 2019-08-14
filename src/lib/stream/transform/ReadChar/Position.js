class Position {
  constructor({ index = 0, line = 1, column = 1 } = {}) {
    this.index = index
    this.line = line
    this.column = column
  }
}

module.exports = Position
