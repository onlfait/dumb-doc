const { FileParser } = require('./lib/parser/FileParser')
const { DocblockMap } = require('./lib/stream/transform/DocblockSort')

const docblockMap = new DocblockMap()
const file = './tests/test-4.js'
const parser = new FileParser({
  file,
  docblockMap,
  breakOnWarning: true,
  onData(docblockMap) {
    console.log(`MAP:`, docblockMap)
  }
})

parser.parse()
