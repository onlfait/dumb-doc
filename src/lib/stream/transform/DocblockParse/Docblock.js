class Docblock {
  constructor({ file } = {}) {
    this.file = file
    this.position = { start: null, end: null }
    this.title = ''
    this.description = ''
    this.tags = []
  }
}

module.exports = Docblock
