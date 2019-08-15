function callbackPathID({ value, tag }) {
  const parts = value.split('/')
  tag.data.name = parts.pop()
  if (parts.length) {
    tag.data.module = parts.join('/')
  }
  return value
}

module.exports = {
  types: function({ value }) {
    return value.replace(/^{|}$/g, '').split('|')
  },

  value: function({ value }) {
    return value.replace(/^=\[|\]$/g, '')
  },

  description: function({ value }) {
    return value.trim()
  },

  '@param:name': function({ value, tag }) {
    const parts = value.replace(/^\[|\]$/g, '').split('=')
    const name = parts.shift()
    tag.data.optional = value[0] === '['
    if (parts.length) {
      tag.data.default = parts.join('=')
    }
    return name
  },

  '@callback:pathid': callbackPathID,
  '@extends:pathid': callbackPathID
}
