const { Transform } = require('stream')
const DocblockMap = require('./DocblockMap')

class DocblockSort extends Transform {
  constructor({ tree = null } = {}) {
    super({ objectMode: true })
    this._map = tree || new DocblockMap()
    this._module = null
    this._class = null
  }

  _transform(docblock, encoding, callback) {
    docblock.tags.forEach(tag => {
      if (tag.name === '@module') {
        this._map.modules.set(tag.data.pathid, docblock)
        this._module = tag.data.pathid
        this._class = null
        return
      }
      if (tag.name === '@class') {
        let pathid = tag.data.name
        if (this._module) {
          pathid = `${this._module}/${pathid}`
        }
        this._map.classes.set(pathid, docblock)
        this._class = pathid
        return
      }
    })
    callback()
  }

  _flush(callback) {
    this.push(this._map)
    callback()
  }
}

module.exports = DocblockSort
