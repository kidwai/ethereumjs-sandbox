# Introduction


A blockchain is a type of distributed database, maintained and updated over time through a peer-to-peer consensus algorithm, determining the next 'block' in sequence. This architecture was originally made popular in 2008, when the Bitcoin blockchain showed promise as a peer-to-peer system for financial transactions. 

At present (June 2016), the experimental Ethereum blockchain is growing quite popular.
The key innovation of the Ethereum blockchain is the ability to do more than just make financial transactions. Instead, through the use of the Etheruem virtual machine, peers can have their programs executed on the Ethereum network. 


From what I've observed, very few people seem to understand the technology. Nevertheless, many people advocate its utility, with little more than speculative and esoteric visions of a 'blockchain economy'. 

I don't mean to discourage any visionaries or theoreticians among us. Rather, I hope to, at a minumum, encourage and help facilitate experiment in blockchain applications in a setting that is not too complicated, while avoiding IDEs or Blockchain as a service platforms.

Every other tutorial or discussion I came across either involved an IDE, or an online compiler. I don't want to use an IDE, or an online compiler, if for no other reason, to not click my mouse to the browser and copy-paste content to run my programs. I don't think this should be necessary to write a 'Hello World!' program, and I feel it takes away significantly from the understanding of what is going on. 

The aim is to have a system to easily get started with your favourite text editor and the command line, run multiple nodes, monitor those nodes, test basic features of the network, rapidly execute smart contracts, and perform unit tests. Not all of these goals will be met right away, as I do have other work to do. 

The hope is that writing this will make things a bit more clear for myself. Perhaps by reading along and mimicking the keystrokes, you can get some sense of what is going on. 

That being said, I make no guarantee whatsoever that this will provide you with any form of satisfaction, enlightenment, or understanding - I am probably not much less confused than you.


## Installation 

We will use 'geth', the go-lang implementation of Ethereum to run our nodes. We will use nodeJS to connect to our nodes locally, then build and execute smart contracts.

### Ubuntu ###
To install `geth` from PPA, run:

```bash
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install -y ethereum solc nodejs
```

### Mac ###
If you don't have `brew`, install it:
		
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
To install `geth` and `solc`, the Solidity compiler, run:

```bash
brew tap ethereum/ethereum
brew install ethereum
brew install cpp-ethereum
brew linkapps cpp-ethereum
brew install node
```

## Needs to be updated to fit with new approach.


## Quick-Start

* See installation.
* Clone this repository

```
git clone https://github.com/kidwai/ethereum-tutorial
```

* Run `npm install` from within the new directory.
* Run `which solc`, and note its output. For me, it is `/usr/bin/solc`.
* Run `./private-chain-start.sh`
* Once the prompt `>` appears, run these commands, replacing '/usr/bin/solc', with your `which solc` output. 

```
>miner.setEtherbase(personal.newAccount("strong password"));
> miner.start();
> personal.unlockAccount(web3.eth.accounts[0], "strong password");
> admin.setSolc('/usr/bin/solc'); 
```

* Launch another terminal window in the same directory. Run `node`.
* Enter `.load js/startup.js`. 

* To deploy a smart contract given only a .sol file, enter `deploy(name)`,
where `name` is the name of the contract in the file named 'name.sol'. Here is an example (included in the repo)

```
> adder = deploy('adder');
```

* Wait for the contract to be mined. 

```javascript
> Transaction mined at address 0x783ce9eb8d98cb3554ed34f04751f9665ecb80eb
```

* Add numbers.
```javascript
> parseInt(adder.add(2,3))
5
> parseInt(adder.add(200,3))
203
```

* Give self pat on back.


From here, you should write your smart contracts, and put them in the `sol` directory, then deploy them like above. This is admittedly not a polished or complicated setup. I am basically just trying to make things easier for myself - so any additional features will come with time. 


## Still-Pretty-Quick-Start

### Starting a private node ###
To keeps things simple for now, we will start by running a single node on a private network. This will allow us to inspect the basic data structures, objects, and procedures without the delay and complications of hopping onto an existing large-scale blockchain. To do this, we will use a custom genesis block (the first block in the blockchain). This is done by specifying the following key block details as a JSON file.

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
> web3.eth.coinbase
null
> web3.eth.blockNumber
0
> web3.eth.getBlock(0)
{
  difficulty: 1024,
  extraData: "0x00",
  gasLimit: 134217728,
  gasUsed: 0,
  hash: "0x8b1f2271ac3d51f7ca371b8e633e8f1625b64fb4bad3a158cc3da8157dfdaa14",
  logsBloom: "0x00000000000000000000000000...",
  miner: "0x3333333333333333333333333333333333333333",
  nonce: "0x0000000000000123",
  number: 0,
  parentHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  receiptRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
  sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
  size: 507,
  stateRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
  timestamp: 0,
  totalDifficulty: 1024,
  transactions: [],
  transactionsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
  uncles: []
}
> web3.eth.getBlock(1)
null
```

So, we have no accounts, our coinbase (default recipient of mined Ether) is null, we are on block number 0, and we can see within its information the data from our JSON file.

### Creating Accounts ###
Everything in Ethereum starts with an account. The first type of account is called an *externally owned account*, and is created like so:

```javascript
> web3.personal.newAccount("strong password that no one will guess")
"0x7a47376c00308be583e1ea5e7a610d58dce68744"
> web3.personal.newAccount("haha")
"0xd451d8e4cc7392c9a21ac8c0e23c6beac1343691"
> web3.eth.accounts
["0x7a47376c00308be583e1ea5e7a610d58dce68744", "0xd451d8e4cc7392c9a21ac8c0e23c6beac1343691"]
> web3.eth.getBalance(web3.eth.accounts[0])
0
```

We will see the other type of account, a *contract account*, when we get to writing smart contracts in Solidity.

### 🔨 Mining ###
To do anything, we need Ether. 
		
```javascript
> miner.start()
	true
```

In the other window, you will see something like this (the timestamps and program name have been ommitted to save space):

	Starting mining operation (CPU=8 TOT=9)
	Automatic pregeneration of ethash DAG ON (ethash dir: /home/momo/.ethash)
	commit new work on block 1 with 0 txs & 0 uncles. Took 110.399µs
	checking DAG (ethash dir: /home/momo/.ethash)
	Generating DAG for epoch 0 (size 1073739904) (0000000000000000000000000000000000000000000000000000000000000000)
	Generating DAG: 0%
	Generating DAG: 1%
	Generating DAG: 2%
	Generating DAG: 3%
	Generating DAG: 4%
	Generating DAG: 5%
	Generating DAG: 6%
	Generating DAG: 7%
	Generating DAG: 8%
	Generating DAG: 9%
	Generating DAG: 10%


Once the [DAG](https://github.com/ethereum/wiki/blob/master/Dagger-Hashimoto.md) is generated, mining will start:


	Generating DAG: 99%
	Generating DAG: 100%
	Done generating DAG for epoch 0, it took 4m18.16510184s
	Starting mining operation (CPU=8 TOT=9)
	commit new work on block 1 with 0 txs & 0 uncles. Took 129.44µs
	🔨  Mined block (#1 / 44d47c8c). Wait 5 blocks for confirmation
	commit new work on block 2 with 0 txs & 0 uncles. Took 150.156µs
	🔨  Mined block (#1 / 348b5a21). Wait 5 blocks for confirmation
	commit new work on block 2 with 0 txs & 0 uncles. Took 123.073µs
	commit new work on block 2 with 0 txs & 0 uncles. Took 977.309µs
	🔨  Mined stale block (#1 / 18c10b67). 
	commit new work on block 2 with 0 txs & 0 uncles. Took 191.801µs
	commit new work on block 2 with 0 txs & 0 uncles. Took 142.205971ms
	🔨  Mined block (#1 / d11b9cb6). Wait 5 blocks for confirmation
	commit new work on block 2 with 0 txs & 0 uncles. Took 28.898533ms
	commit new work on block 2 with 0 txs & 0 uncles. Took 122.455µs
	🔨  Mined block (#2 / cfb278cb). Wait 5 blocks for confirmation
	commit new work on block 3 with 0 txs & 0 uncles. Took 205.311µs
	🔨  Mined stale block (#2 / ac569b95). 
	commit new work on block 3 with 0 txs & 0 uncles. Took 146.449742ms
	commit new work on block 3 with 0 txs & 0 uncles. Took 156.201µs
	🔨  Mined block (#3 / 06152682). Wait 5 blocks for confirmation


By default, all mining rewards are deposited into the account at `web3.eth.accounts[0]`. In the console, you can verify the increasing balance:


```javascript
> web3.getBalance(web3.eth.accounts[0]) //units are in wei. 1 ether = 10^18 wei
45000000000000000000
> web3.getBalance(web3.eth.accounts[1]) // still 0
0
> web3.fromWei(web3.getBalance(web3.eth.accounts[0])) // convert from wei to ether
45
```

To send some Ether, run:

```javascript
> var sender = web3.eth.accounts[0]; var receiver = web3.eth.accounts[1]
undefined
> web3.personal.unlockAccount(sender, "strong password that no one will guess")
true
> web3.eth.sendTransaction({from: sender, to: receiver, value: 20})
"0xcd2b5724cff9afcf5236a1f49692fbc9082ffac5da6cbe176626c2f8443f07a8"  //transaction hash
```

In the other window, you will see the transaction hash and destination address, followed by a log of a block mined with `1 txs`, a single transaction.


	Tx(0x2d4e0ec822f65549116da31cb70d6d04b39d558e031b4927927a75cec87030ff) to: 0xd451d8e4cc7392c9a21ac8c0e23c6beac1343691
	 commit new work on block 18 with 1 txs & 0 uncles. Took 793.931µs   // our transaction will be mined in block 18
	  🔨  Mined block (#18 / 57a17fa2). Wait 5 blocks for confirmation     // our transaction has been mined
	 commit new work on block 19 with 0 txs & 0 uncles. Took 232.13µs
	 commit new work on block 19 with 0 txs & 0 uncles. Took 260.54µs
	 🔨  Mined block (#19 / 6eae0bae). Wait 5 blocks for confirmation
	 commit new work on block 20 with 0 txs & 0 uncles. Took 195.227µs
	 commit new work on block 20 with 0 txs & 0 uncles. Took 183.743µs


Confirm the payment has been received:

```javascript
> web3.eth.getBalance(receiver)
20
```

### Contracts ###

Type the following contract directly into a variable called source.

```javascript
> var source = 'contract adder { function add(uint a, uint b) constant returns (uint c) { return a+b;} }'
```

Compile this and save the output to a variable:

```javascript
> var compiled = web3.eth.compile.solidity(source)
undefined
> compiled
{
  adder: {
    code: "0x6060604052602b8060106000396000f3606060405260e060020a6000350463771602f78114601a575b005b602435600435016060908152602090f3",
    info: {
      abiDefinition: [{...}],
      compilerOptions: "--bin --abi --userdoc --devdoc --add-std --optimize -o /tmp/solc171650220",
      compilerVersion: "0.3.2",
      developerDoc: {
        methods: {}
      },
      language: "Solidity",
      languageVersion: "0.3.2",
      source: "contract adder { function add(uint a, uint b) returns (uint c) {return a+b;} }",
      userDoc: {
        methods: {}
      }
    }
  }
}
```

The code contained in the `compiled.adder.code` field is the byte code that will be run on the Ethereum Vritual Machine (EVM). The `info` section contains metadata on the contract, including a field `abiDefinition`, which serves as an interface for creating contracts. To do this, run:

```javascript
> var adder_contract = web3.eth.contract(compiled.adder.info.abiDefinition)
undefined
> adder_contract
{
  abi: [{
      constant: false,
      inputs: [{...}, {...}],
      name: "add",
      outputs: [{...}],
      type: "function"
  }],
  at: function(address, callback),
  new: function()
}
```

Towards the bottom is a function called `new`. It is this function that is used to deploy the contract to the blockchain. To do this, define the following callback function:

```javascript
function tx_callback (e, contract) {
	if (!e) {
		if (!contract.address) {
			console.log("Transaction Hash: " + contract.transactionHash + " waiting to be mined.");	
		} else {
			console.log("Transaction mined at address " + contract.address)
		}
	}
}
```

Then, invoke the `new` function like so:

```javascript
> var code = compiled.adder.code
> code
"0x6060604052602b8060106000396000f3606060405260e060020a6000350463771602f78114601a575b005b602435600435016060908152602090f3"
> var primary = web3.eth.accounts[0]
> personal.unlockAccount(primary, 'strong password that no one will guess') //  replace with your password
> var adder = adder_contract.new({from: primary, data: code, gas: 1000000}, tx_callback)
Transaction Hash: 0xe8ac2ba57281a8ec274993c605f44c2b854ce40adb1d3069cf7b5210b01dd0e0 waiting to be mined.
```

In the logs, you will see a similar set of messages to those obtained from sending Ether between accounts. After some delay, the transaction will be mined, and the resulting `adder` can be invoked:

```javascript
> Transaction mined at address 0x783ce9eb8d98cb3554ed34f04751f9665ecb80eb
> parseInt(adder.add(2,3))
5
> parseInt(adder.add(200,3))
203
```

So, after all of that, we can, with some confidence, asssert that 2+3 and 200+3 are indeed 5 and 203, respectively. As underwhelming as this is, it is not hard to automate essentially everything we did aside from writing the Solidity code, after which the process becomes one of simply building and deploying. 


This whole process seems weird, slow, and convoluted. I found it worth seeing at least once to motivate the use of nodeJS.


### Connecting with Node.js ###

Run geth with the arguments below. Don't worry about what all the flags mean right now. If you can't go on without understanding them, just read the information provided with `geth --help`. By the way, this is the command executed by the script `private-chain-start.sh`.


```bash
$ geth --rpc --rpcapi "eth,web3,personal,net,miner,admin" --networkid 123 console
```

This will start an Ethereum node, expose the api specified via RPC, and start mining. To connect via Node.js, run `nodejs` in another terminal, and execute the following comands:

```javascript
> var web3 = require('web3')
> var web3 = new web3(new web3.providers.HttpProvider("http://localhost:8545"))
> web3.eth.accounts
[ '0x56e9f2fffc8fde5f0419a7c63e15f6d67ddbd228',
  '0x14aaf671e0d9f0dec3555dcf2f572bdb05932319' ]

```

We now have access to the tools from the `geth` console. Importantly, though, we can now use Node.js to use more advanced scripting features, interacting with our filesystem. To start, let's automate some of the commands appearing often, and save it in a file called 'startup.js'. I have included this file in the folder `js`. To use them directly, just clone or download the this repository, then in your nodejs session, run `.load js/startup.js`. 

Before going through the details of each line in the `startup.js` file, just observe the result. Instead of doing all of that nonsense from before, we can instead just write the solidity code in an ordinary external text editor, then built and deploy it from a nodejs session.

Save the source for the adder contract in a file `adder.sol`.

```javascript
contract adder {
	function add(uint a, uint b) constant returns (uint c) { return a + b; }
}
```

Then, in a nodeJS session,

```javascript
> .load js/startup.js
> var adder_contract = build('adder.sol', 'adder')
> web3.personal.unlockAccount(web3.eth.accounts[0], 'strong password that no one will guess')
> var adder = deploy(adder_contract)
> Contract transaction send: TransactionHash: 0x6a142fb14216614b6d82e88d19294c870067ea83ec11c769560fa7f867d886f0 waiting to be mined...
Contract mined! Address: 0x67a62d7001cf8e5e75f5bca773b44e52608c63f6
> parseInt(adder.add(1,2))
3
```




### A Simple Token


Now that we finally have some basic setup, let's have a look at a simple token contract [a simplified version of the token contract described here: https://www.ethereum.org/token]. This is actually more powerful than it might seem, since in principal, a token can be used to represent such things as money, property, or voting rights. We are going to try to take this simple notion of a token to build some simple financial services, then get a sense of how a blockchain network handles these.

Save the following in a file called `token.sol`. 


```javascript
contract  token {
	mapping (address => uint256) public balanceOf;
	
	function token (uint initial_supply) {
		balanceOf[msg.sender] = initial_supply;
	}

	function transfer(address _receiver, uint256 _value) {
		if (balanceOf[msg.sender] < _value) throw;
		if (balanceOf[_receiver] + _value < balanceOf[_receiver]) throw;
		balanceOf[msg.sender] -= _value;
		balanceOf[_receiver] += _value;
	}
}
```


### A Simple Performance Test 


### More Nodes
