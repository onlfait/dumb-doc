class DocblockTree {
  constructor() {
    this.modules = new Map()
    this.classes = new Map()
    this.interfaces = new Map()
    this.functions = new Map()
    this.callbacks = new Map()
    this.constants = new Map()
    this.globals = new Map()
    this.variables = new Map()
    this.examples = new Map()
    this.exports = new Map()
  }
}

module.exports = DocblockTree
