const DocblockTag = require('./DocblockTag')
const tokens = require('./tokens')
const rules = require('./rules')
const filters = require('./filters')

const TOKEN_PATTERN = /<([^>]+)>/g

function splitOnSpace(value) {
  return value
    .replace(/ +/, ' ')
    .trim()
    .split(' ')
}

class DocblockTagParser {
  constructor() {
    this._tokens = {}
    this._rules = {}
    this._filters = filters
    this.setTokens(tokens)
    this.setRules(rules)
    this.setFilters(filters)
  }

  _parseToken(token) {
    return token.replace(TOKEN_PATTERN, (match, $1) => this._tokens[$1])
  }

  setToken(name, token, parentheses = false) {
    if (parentheses) {
      token = `(?:${token})`
    }
    this._tokens[name] = this._parseToken(token)
  }

  setTokens(tokens) {
    for (let name in tokens) {
      const token = tokens[name]
      if (typeof token === 'string') {
        this.setToken(name, token)
      } else {
        this.setToken(name, token[0], !!token[1])
      }
    }
  }

  setRule(name, value) {
    const names = []
    value = value.replace(TOKEN_PATTERN, (match, $1) => {
      const token = $1.split(':', 2)
      let tokenName = token.shift()
      let tokenValue = token.shift()
      // named token
      if (tokenValue) {
        tokenName = tokenName || tokenValue
        names.push(tokenName)
        tokenValue = `<${tokenValue}>`
        return `(${this._parseToken(tokenValue)})`
      }
      return this._parseToken(match)
    })
    this._rules[name] = { regexp: new RegExp(`^${value}$`, 's'), names }
  }

  setRules(rules) {
    for (let name in rules) {
      this.setRule(name, rules[name])
    }
  }

  setFilter(name, filter) {
    this._filters[name] = filter
  }

  setFilters(filters) {
    for (let name in filters) {
      this.setFilter(name, filters[name])
    }
  }

  _getFilter(tag, rule) {
    return this._filters[`${tag}:${rule}`] || this._filters[rule]
  }

  parse(input) {
    const index = input.indexOf(' ')
    const name = input.slice(0, index).trim()
    const value = input.slice(index)
    const rule = this._rules[name]
    const tag = new DocblockTag(name)
    if (!rule) {
      tag.args = splitOnSpace(value)
      tag.noRule = true
      return tag
    }
    const matches = value.match(rule.regexp)
    if (!matches) {
      tag.args = splitOnSpace(value)
      tag.noMatch = true
      return tag
    }
    matches.shift()
    matches.forEach((value, i) => {
      const label = rule.names[i]
      const filter = this._getFilter(name, label)
      if (value && typeof filter === 'function') {
        value = filter({ value, tag })
      }
      tag.data[label] = value || null
      tag.args.push(value)
    })
    return tag
  }
}

module.exports = DocblockTagParser
