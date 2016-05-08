# Ethereum-tutorial

Ethereum is a secure decentralized platform facilitating arbitrarily complex computations. For an overview, read the [white paper](https://github.com/ethereum/wiki/wiki/White-Paper). For detail, read the [yellow paper](http://gavwood.com/paper.pdf).

This tutorial aims to reproduce our own approach towards understanding the command-line tools and the Solidity language for smart contract. Please note this is a work in progress.

There are many different tools providing access to the Ethereum network. It is instructive to stick with the command-line tools to start out. Specifically, we will use `geth`, the Go implementation of the command-line interface, to run nodes on the network.


# Installation

### Ubuntu ###
To install `geth` from PPA, run:

```bash
	sudo apt-get install software-properties-common
	sudo add-apt-repository -y ppa:ethereum/ethereum
	sudo apt-get update
	sudo apt-get install ethereum
```

### Mac ###
If you don't have `brew`, install it:
		
```bash
	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
To install `geth`, run:

```bash
	brew tap ethereum/ethereum
	brew install ethereum
```


# Starting a private node
To keeps things simple for now, we will start by running a single node on a private network. This will allow us to inspect the basic data structures, objects, and procedures without the delay and complications of hopping onto an existing large-scale blockchain. To do this, we will use a custom genesis block. This is done by specifying the following key block details as a JSON file.

* nonce: 64-bit hash used with mixhash for proof-of-work
* timestamp: Unix-time value
* parentHash: Keccak 256-bit hash of parent block header
* gasLimit: Maximum amount of gas that can be expended in a single block
* difficulty: Determines the difficulty of mining this block
* mixhash: 256-bit hash used with nonce for proof-of-work
* coinbase: The address of the account in which mining rewards are deposited
* alloc: A specification of initial Ether allocations among accounts on the network
* extraData: Additional relevant block data, up to a maximum of 32 bytes

Save the following into a file called 'genesis.json'.

```json
    {
      "nonce": "0x0000000000000123",
      "timestamp": "0x0",
      "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "extraData": "0x0",
      "gasLimit": "0x8000000",
      "difficulty": "0x400",
      "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "coinbase": "0x3333333333333333333333333333333333333333",
      "alloc": {}
    }	
```

To start a node, run

	geth --genesis genesis.json

This will use the above json file to write block 0 of the blockchain, the genesis block. You will see
some networking logs indicating the server starting. Open another terminal and run

	geth attach

This will launch the Javascript Runtime Environment included in `geth`. Here, you have access to a
variety of management APIs, and you can write ordinary JavaScript code. It is instructive to keep
an eye on both terminal windows simultaneously, as the first provides immediate insights for debugging
and understanding.

Start by inspecting the state of the network. 

```javascript
	> web3.eth.accounts
	[]
	> web3.eth.blockNumber
	0
```
