const { createReadStream } = require('fs')
const { readChar } = require('../../stream/transform/ReadChar')
const { docblockTokenize } = require('../../stream/transform/DocblockTokenize')
const { docblockParse } = require('../../stream/transform/docblockParse')
const { docblockSort } = require('../../stream/transform/docblockSort')

class FileParser {
  constructor({
    file,
    onData,
    breakOnWarning = true,
    onError = null,
    onWarning = null
  } = {}) {
    if (typeof file.pipe === 'function') {
      this._stream = file
    } else {
      this._stream = createReadStream(file)
    }
    this._file = this._stream.path
    this._onData = onData
    this._breakOnWarning = breakOnWarning
    this._onError = onError || this._onError
    this._onWarning = onWarning || this._onWarning
  }

  _onError(error) {
    console.log(`ERROR: ${error.message}\n  at ${error.file}:${error.line}`)
  }

  _onWarning(error) {
    console.log(`WARNING: ${error.message}\n  at ${error.file}:${error.line}`)
  }

  parse() {
    return (
      this._stream
        // read char by char
        .pipe(readChar())
        // extract docblock tokens
        .pipe(docblockTokenize())
        // parse docblock tokens
        .pipe(
          docblockParse({
            file: this._file,
            breakOnWarning: this._breakOnWarning
          })
        )
        .on('warning', this._onWarning)
        .on('error', this._onError)
        // to DocblockMap
        .pipe(docblockSort())
        .on('error', this._onError)
        .on('data', this._onData)
    )
  }
}

module.exports = FileParser
