const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(numBuckets).fill(null);
  }

  hash(key) {
    // Your code here
    let hash = sha256(key).slice(0, 8);
    return parseInt(hash, 16);
  }

  hashMod(key) {
    // Your code here
    return this.hash(key) % this.capacity;
  }

  insertNoCollisions(key, value) {
    // Your code here
    let keyValuePair = new KeyValuePair(key, value);
    if (this.data[this.hashMod(key)] !== null) {
      throw new Error('hash collision or same key/value pair already exists!');
    }
    this.data[this.hashMod(key)] = keyValuePair;
    this.count++;
  }

  insertWithHashCollisions(key, value) {
    // Your code here
    let keyValuePair = new KeyValuePair(key, value);
    let hash = this.hashMod(key);
    console.log(hash, 'HASH')
    if (this.data[hash] !== null) {
      keyValuePair.next = this.data[hash];
    }
    this.data[hash] = keyValuePair;
    this.count++;
  }

  insert(key, value) {
    // Your code here
    let keyValuePair = new KeyValuePair(key, value);
    let hash = this.hashMod(key);
    // console.log(hash, 'HASH')
    if (this.data[hash] !== null) {
      let current = this.data[hash];
      while (current) {
        if (current.key === keyValuePair.key) {
          current.value = keyValuePair.value;
          return;
        }
        current = current.next;
      }
      keyValuePair.next = this.data[hash];
    }
    this.data[hash] = keyValuePair;
    this.count++;
  }
}

module.exports = HashTable;
