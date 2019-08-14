const debug = require('./debug')
const benchmark = require('./benchmark')
const { createReadStream } = require('fs')
const { readChar } = require('./lib/stream/transform/ReadChar')
const { docblockTokenize } = require('./lib/stream/transform/DocblockTokenize')
const { docblockParse } = require('./lib/stream/transform/docblockParse')
const { stringify } = require('./lib/stream/transform/Stringify')

const stream = createReadStream('./tests/test-3.js', 'utf8')
const times = []

function onError(error) {
  debug.title(`ERROR: ${error.message}\n  at ${stream.path}:${error.line}`)
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
  .on('error', onError)
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

  // extract docblock tokens
  .pipe(docblockParse({ onError: true }))
  .on('error', onError)
  .on('end', () => {
    onEnd('docblockParse')
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
