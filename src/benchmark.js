const NS_PER_SEC = 1e9
const NS_PER_MS = 1e6
const groups = {}

function toMillis(nanoseconds) {
  return nanoseconds / NS_PER_MS
}

function start(group = null) {
  const hrtime = process.hrtime()
  groups[group || 'default'] = hrtime
}

function elapsed(group = null) {
  const hrtime = groups[group || 'default']
  const diff = process.hrtime(hrtime)
  const nanoseconds = diff[0] * NS_PER_SEC + diff[1]
  return nanoseconds
}

function stop(group = null) {
  const nanoseconds = elapsed(group)
  delete groups[group || 'default']
  return nanoseconds
}

module.exports = {
  start,
  elapsed,
  stop,
  toMillis
}
