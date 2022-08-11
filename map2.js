class Map2 {
  map = new Map()

  get(key, key2) {
    let innerMap = this.map.get(key)
    return innerMap ? innerMap.get(key2) : undefined
  }

  set(key, key2, value) {
    let innerMap = this.map.get(key)
    if (!innerMap) {
      innerMap = new Map()
      this.map.set(key, innerMap)
    }
    innerMap.set(key2, value)
    return this
  }

  delete(key, key2) {
    const innerMap = this.map.get(key)
    if (innerMap) {
      innerMap.delete(key2)
    }
    return this
  }

  clear() {
    this.map.clear()
    return this
  }

  has(key, key2) {
    const innerMap = this.map.get(key)
    return innerMap ? innerMap.has(key2) : false
  }

  getKeys() {
    const keys = []
    for (const [key, innerMap] of this.map.entries()) {
      for (const key2 of innerMap.keys()) {
        keys.push([key, key2])
      }
    }
    return keys
  }

  getValues() {
    const values = []
    for (const innerMap of this.map.values()) {
      for (const value of innerMap.values()) {
        values.push(value)
      }
    }
    return values
  }

  getEntries() {
    const entries = []
    for (const [key, innerMap] of this.map.entries()) {
      for (const [key2, value] of innerMap.entries()) {
        entries.push([key, key2, value])
      }
    }
    return entries
  }
}

export default Map2
