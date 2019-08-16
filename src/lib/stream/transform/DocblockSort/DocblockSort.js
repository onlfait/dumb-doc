const { Transform } = require('stream')
const DocblockTree = require('./DocblockTree')

class DocblockSort extends Transform {
  constructor() {
    super({ objectMode: true })
    this._tree = new DocblockTree()
  }

  _transform(docblock, encoding, callback) {
    this.push(docblock)
    callback()
  }

  _flush(callback) {
    callback()
  }
}

module.exports = DocblockSort
