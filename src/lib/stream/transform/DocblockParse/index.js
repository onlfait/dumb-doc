const DocblockParse = require('./DocblockParse')

function docblockParse(options = {}) {
  return new DocblockParse(options)
}

module.exports = {
  DocblockParse,
  docblockParse
}
