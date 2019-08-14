class DocblockTag {
  constructor(name) {
    this.name = name
    this.data = {}
    this.args = []
    this.noRule = false
    this.noMatch = false
    this.position = {
      start: null,
      end: null
    }
  }
}

module.exports = DocblockTag
