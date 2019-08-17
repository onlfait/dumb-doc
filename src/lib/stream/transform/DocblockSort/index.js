const DocblockMap = require('./DocblockMap')
const DocblockSort = require('./DocblockSort')

function docblockSort() {
  return new DocblockSort()
}

module.exports = {
  DocblockMap,
  DocblockSort,
  docblockSort
}
