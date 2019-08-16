const DocblockTree = require('./DocblockTree')
const DocblockSort = require('./DocblockSort')

function docblockSort() {
  return new DocblockSort()
}

module.exports = {
  DocblockTree,
  DocblockSort,
  docblockSort
}
