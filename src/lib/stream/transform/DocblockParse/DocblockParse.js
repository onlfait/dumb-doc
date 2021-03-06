const { Transform } = require('stream')
const Docblock = require('./Docblock')
const tokenIds = require('../DocblockTokenize/token-ids')
const { DocblockTagParser } = require('../../../parser/DocblockTagParser')

const parser = new DocblockTagParser()

class DocblockParse extends Transform {
  constructor({ file, breakOnWarning = true } = {}) {
    super({ objectMode: true, highWaterMark: 1 })
    this._breakOnWarning = breakOnWarning
    this._docblock = null
    this._file = file
  }

  _transform(token, encoding, callback) {
    if (token.id === tokenIds.DOCBLOCK_TAG) {
      const tag = parser.parse(token.value)
      if (tag.noRule || tag.noMatch) {
        const label = tag.noRule ? 'Unsupported' : 'Malformed'
        let error = {
          message: `${label} tag ${tag.name}`,
          file: this._docblock.file,
          line: token.position.start.line
        }
        if (!this._breakOnWarning) {
          this.emit('warning', error)
          error = null
        }
        callback(error)
        return
      }
      if (tag.data.description) {
        tag.data.description = tag.data.description.trim()
      }
      tag.position = token.position
      this._docblock.tags.push(tag)
    } else if (token.id === tokenIds.DOCBLOCK_OPEN) {
      this._docblock = new Docblock({ file: this._file })
      this._docblock.position.start = token.position.start
    } else if (token.id === tokenIds.DOCBLOCK_TITLE) {
      this._docblock.title = token.value
    } else if (token.id === tokenIds.DOCBLOCK_DESC) {
      this._docblock.description = token.value.trim()
    } else if (token.id === tokenIds.DOCBLOCK_CLOSE) {
      this._docblock.position.end = token.position.end
      this.push(this._docblock)
      this._docblock = null
    }
    callback()
  }
}

module.exports = DocblockParse
