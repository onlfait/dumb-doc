function log(...args) {
  console.log(...args)
}

function spacer({ char = '=', limit = 79 } = {}) {
  log(char.repeat(limit))
}

function title(string) {
  spacer()
  log(string)
  spacer()
}

function block(string, data) {
  title(string)
  log(data)
  spacer()
}

module.exports = {
  log,
  spacer,
  title,
  block
}
