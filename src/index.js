const debug = require('./debug')
const benchmark = require('./benchmark')
const { createReadStream } = require('fs')
const { readChar } = require('./lib/stream/transform/ReadChar')
const { docblockTokenize } = require('./lib/stream/transform/DocblockTokenize')
const { docblockParse } = require('./lib/stream/transform/docblockParse')
const { docblockSort } = require('./lib/stream/transform/docblockSort')
const { stringify } = require('./lib/stream/transform/Stringify')

const stream = createReadStream('./tests/test-3.js', 'utf8')
const times = []

function onError(error) {
  debug.title(`ERROR: ${error.message}\n  at ${error.file}:${error.line}`)
}

function onStart(group) {
  benchmark.start(group)
}

function onEnd(group) {
  times[group] = benchmark.toMillis(benchmark.stop(group))
}

function printTimes() {
  for (var group in times) {
    debug.spacer()
    debug.log(`Benchmak: [${group}] took ${times[group]} ms`)
    debug.spacer()
  }
}

onStart('total')
onStart('readChar')

stream
  // read char by char
  .pipe(readChar())
  .on('end', () => {
    onEnd('readChar')
    onStart('docblockTokenize')
  })

  // extract docblock tokens
  .pipe(docblockTokenize())
  .on('error', onError)
  .on('end', () => {
    onEnd('docblockTokenize')
    onStart('docblockParse')
  })

  // parse docblock tokens
  .pipe(docblockParse({ file: stream.path, onError: true }))
  .on('error', onError)
  .on('end', () => {
    onEnd('docblockParse')
    onStart('docblockSort')
  })

  // to docblock tree
  .pipe(docblockSort())
  .on('error', onError)
  .on('end', () => {
    onEnd('docblockSort')
    onStart('stringify')
  })

  // to string...
  .pipe(stringify())
  .on('error', onError)
  .on('end', () => {
    onEnd('stringify')
    onEnd('total')
    printTimes()
  })

  // to standard output
  .pipe(process.stdout)
