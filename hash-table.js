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

let hashTable = new HashTable(2);
// hashTable.hash('A');
// hashTable.insertWithHashCollisions("key-1", "val-1");
// hashTable.insertWithHashCollisions("key-2", "val-2");
// hashTable.insertWithHashCollisions("key-3", "val-3");
// hashTable.insertWithHashCollisions("key-1", "val-1000");
hashTable.insert("key-1", "val-1");
hashTable.insert("key-2", "val-2");
hashTable.insert("key-3", "val-3");
hashTable.insert("key-1", "val-100000");

console.log(hashTable.count); // 3
console.log(hashTable.capacity); // 2
console.log(hashTable.data.length) // 2
// hashTable.insertNoCollisions("key-3", "val-3");
const pairC = hashTable.data[0];
const pairB = hashTable.data[1];
const pairA = hashTable.data[0].next;

// console.log(pairA.key, pairA.value)
// console.log(hashTable.data[0].next)
console.log(hashTable.data[0])
console.log(hashTable)
module.exports = HashTable;
