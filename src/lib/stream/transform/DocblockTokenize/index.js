const DocblockTokenize = require('./DocblockTokenize')
const tokenIds = require('./token-ids')

function docblockTokenize() {
  return new DocblockTokenize()
}

module.exports = {
  DocblockTokenize,
  docblockTokenize,
  tokenIds
}
