const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlockChain()];
    }

    createGenesisBlockChain() {
        return new Block(0, '01/01/2023', 'Wenqi Block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            if (this.chain[0].hash !== this.chain[0].calculateHash()) {
                return false;
            }
            if (this.chain[i].hash !== this.chain[i].calculateHash()) {
                return false;
            }
            if (this.chain[i].previousHash !== this.chain[i - 1].hash) {
                return false;
            }
        }
        return true;
    }
}

let myCoin = new BlockChain();
myCoin.addBlock(new Block(1, '02/01/2023', { money: 1 }));
myCoin.addBlock(new Block(2, '03/01/2023', { money: 2 }));


myCoin.chain[0].data = { money: 3 };
myCoin.chain[0].hash = myCoin.chain[1].calculateHash();
console.log(JSON.stringify(myCoin, null, 4));

console.log("============");

console.log("is myChain valid? " + myCoin.isChainValid());