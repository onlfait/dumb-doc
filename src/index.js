const { FileParser } = require('./lib/parser/FileParser')

const file = './tests/test-4.js'
const parser = new FileParser({
  file,
  breakOnWarning: true,
  onData(docblockMap) {
    console.log(`MAP:`, docblockMap)
  }
})

parser.parse()
