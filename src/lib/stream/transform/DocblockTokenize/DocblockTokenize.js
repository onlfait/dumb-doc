const { Transform } = require('stream')
const tokenIds = require('./token-ids')

class DocblockTokenize extends Transform {
  constructor() {
    super({ objectMode: true })
    this._inComment = false
    this._docblock = null
    this._chars = []
  }

  _discardChars(offset = 0) {
    if (offset) {
      this._chars = this._chars.slice(0, offset)
    } else {
      this._chars = []
    }
  }

  _firstChar(offset = 0) {
    return this._chars[offset] || null
  }

  _lastChar(offset = -1) {
    return this._chars[this._chars.length + offset] || null
  }

  _lastCharValue(offset = -1) {
    return (this._lastChar(offset) || { value: null }).value
  }

  _isPrevCharValue(value, offset = -1) {
    return value === this._lastCharValue(offset)
  }

  _isOpenToken() {
    return (
      this._isPrevCharValue('/', -3) &&
      this._isPrevCharValue('*', -2) &&
      this._isPrevCharValue('*', -1)
    )
  }

  _isCloseToken() {
    return this._isPrevCharValue('*', -2) && this._isPrevCharValue('/', -1)
  }

  _isComment() {
    return this._isPrevCharValue('/', -2) && this._isPrevCharValue('/', -1)
  }

  _getLinePosition() {
    return {
      start: this._firstChar().position,
      end: this._lastChar().position
    }
  }

  _processCode() {
    if (!this._chars.length) return
    const value = this._chars.map(c => c.value).join('')
    if (value.trim().length) {
      this.push({
        position: this._getLinePosition(),
        id: tokenIds.SOURCE_TEXT,
        value
      })
    }
    this._discardChars()
  }

  _processLine() {
    if (!this._chars.length) return
    const raw = this._chars.map(c => c.value).join('')
    const value = raw.replace(/^ *\*?/g, '')
    const testValue = value.trim()
    if (!testValue.length) {
      this._discardChars()
      return
    }
    // line position
    const position = this._getLinePosition()
    // tag line start
    if (testValue[0] === '@') {
      // notify last tag line
      if (this._docblock.currentTag) {
        this.push({
          ...this._docblock.currentTag,
          id: tokenIds.DOCBLOCK_TAG
        })
        this._docblock.currentTag = null
      }
      // notify description
      if (this._docblock.description) {
        this.push({
          ...this._docblock.description,
          id: tokenIds.DOCBLOCK_DESC
        })
        this._docblock.description = null
      }
      // memoize current tag line
      const tagLine = value.replace(/^ +/, '')
      this._docblock.currentTag = {
        value: tagLine,
        position,
        raw
      }
      this._discardChars()
      return
    }
    // tag line rest...
    if (this._docblock.currentTag) {
      this._docblock.currentTag.raw += raw
      this._docblock.currentTag.value += value
      this._docblock.currentTag.position.end = position.end
      this._discardChars()
      return
    }
    // title
    if (!this._docblock.title) {
      this._docblock.title = position
      this.push({
        id: tokenIds.DOCBLOCK_TITLE,
        value: testValue,
        position,
        raw
      })
      this._discardChars()
      return
    }
    // description start
    if (!this._docblock.description) {
      const description = value.replace(/^ +/, '')
      this._docblock.description = {
        value: description,
        position,
        raw
      }
      this._discardChars()
      return
    }
    // description rest...
    this._docblock.description.raw += raw
    this._docblock.description.value += value
    this._docblock.description.position.end = position.end
    this._discardChars()
  }

  _endOfLines() {
    // notify description
    if (this._docblock.description) {
      this.push({
        ...this._docblock.description,
        id: tokenIds.DOCBLOCK_DESC
      })
      this._docblock.description = null
    }
    // notify last tag line
    if (this._docblock.currentTag) {
      this.push({
        ...this._docblock.currentTag,
        id: tokenIds.DOCBLOCK_TAG
      })
      this._docblock.currentTag = null
    }
  }

  _openDocblock() {
    const token = {
      position: {
        start: this._lastChar(-3).position,
        end: this._lastChar().position
      },
      id: tokenIds.DOCBLOCK_OPEN,
      value: '/**'
    }
    this._discardChars(-3)
    this._processCode()
    this.push(token)
    this._docblock = {
      title: null,
      description: null,
      currentTag: null
    }
  }

  _closeDocblock() {
    const token = {
      position: {
        start: this._lastChar(-2).position,
        end: this._lastChar().position
      },
      id: tokenIds.DOCBLOCK_CLOSE,
      value: '*/'
    }
    this._discardChars(-2)
    this._processLine()
    this._endOfLines()
    this.push(token)
    this._docblock = null
  }

  _transform(char, encoding, callback) {
    this._chars.push(char)
    if (this._docblock) {
      if (this._isCloseToken()) {
        this._closeDocblock()
      } else if (char.value === '\n') {
        this._processLine()
      }
    } else if (!this._inComment && this._isOpenToken()) {
      this._openDocblock()
    } else if (this._inComment && char.value === '\n') {
      this._inComment = false
    } else if (this._isComment()) {
      this._inComment = true
    }
    callback()
  }

  _flush(callback) {
    this._processCode()
    callback()
  }
}

module.exports = DocblockTokenize
