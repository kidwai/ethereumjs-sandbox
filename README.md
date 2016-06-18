# Ethereum

The key innovation of the Ethereum blockchain is the ability to do more than just make financial transactions. Instead, through the use of the Etheruem virtual machine, peers can have their programs executed on the Ethereum network. 

From what I've observed, very few people seem to understand blockchain technology. Nevertheless, many people advocate its utility, with little more than speculative and esoteric visions of a 'blockchain economy'. 

I don't mean to discourage any visionaries or theoreticians among us. Rather, I hope to, at a minumum, encourage and help facilitate experiment in blockchain applications in a setting that is not too complicated, while avoiding IDEs or Blockchain as a service platforms [I don't feel these should be necessary to write a simple Hello, World program].

The aim is to have a system to easily get started with your favourite text editor and the command line, run multiple nodes, monitor those nodes, test basic features of the network, rapidly execute smart contracts, and perform unit tests.

Below you will find a very short description and some simple examples. For (much) more detail on how I arrived at these and where I am going, see the [wiki](https://github.com/kidwai/ethereum-tutorial/wiki), but keep in mind, this is all very much a work in progress.


# Prerequisites

* You need a device running Ubuntu 16.04, or OS X.
* You should read the Ethereum [white paper](https://github.com/ethereum/wiki/wiki/White-Paper).
* You should be comfortable with some form of programming.

# Installation

We will use 'geth', the go-lang implementation of Ethereum to run our nodes, together with node.js to communicate with them. 

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

### Usage

###### I'm not going to explain much here - this is intended for cloning and coding right away. If you have a look into any of the code, you'll see it's basically just a few wrappers around `geth` functions.

* See installation.
* Clone this repository: `git clone https://github.com/kidwai/ethereum-tutorial.git`, or download the [zip](https://github.com/kidwai/ethereum-tutorial/archive/master.zip).
* Open a shell to the new directory and run `npm install && npm start quick`. This will run a single `geth` node, create an account, start mining on a private blockchain, and provide log information in `logs/geth.log`.
* (Optional) Geth logs provide valuable information about the inner workings of your node, your transactions, and the state of the network. You can keep an eye on the log file by opening a separate shell in the same directory and running `tail -f logs/geth.log`. I typically keep this in at least my peripheral vision at all times, for each node. 
* Enter `node tools console`. This will connect you to the node and leave you in an interactive javacsript REPL console. 
* Write your smart contracts in any text editor, save them in the `sol` directory with a `.sol` extension.
* To deploy a smart contract, just enter `tools.deploy(name)`, where `name` is the name of the contract in the file named 'name.sol'.

## Examples

### A Simple Ticker

In the provided `sol` directory is the following simple contract:

```javascript
contract ticker {
	uint public val;

	function tick () { val += 1; }
}
```

From within your interactive node session, run `ticker = tools.deploy('ticker');`. After the contract is mined, you can do stuff with it. Like tick. 


```javascript
 > ticker = tools.deploy('ticker');
 > Contract transaction sent: TransactionHash: 0xe8a8c9ba5b301a8aee124ab0d7f717466e283f15e6c1d3ab5e9fd70e374e0db8 waiting to be mined...
Contract mined! Address: 0x73453ff26f284aa2ac302ae1cb0bd728fe5f2a06
> parseInt(ticker.val())
0
> ticker.tick()
'0x696eb740232f84e4c09b5cfd0f1aba482e87681f1cdff042f1587a46c546d119' // wait a few seconds
> parseInt(ticker.val())
1 
```

As a simple exercise, we can use this ticker to see how the  network handles transactions of this sort. The function `tools.txps` will calculate the number of transactions per second attainable, given a transaction to execute and a time. From the REPL console,

```javascript
> tools.txps(ticker.tick, 10 )
8.9
```

To test the txps for the tick function directly from the command line, run

```bash
node test ticker tick 10
Contract transaction sent: TransactionHash: 0xa6ac74ce9c92d4829f9d18998f4a272ba1449a6650332b37acd5a3713d310ae3 waiting to be mined...
Contract mined! Address: 0x98fa026c70b369ad8b1c6285a189bf416b6943c8
Starting 10s tx test.
...
Done. txps = 10
```



### A Simple Token

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

