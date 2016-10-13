## EthereumJS Sandbox

This is a rough sketch of some JS components that can be used to play with Solidity contracts at the command line, or in the browser. 

## Installation

Clone this repository.

```
git clone https://github.com/kidwai/ethereumjs-sandbox
```

Install node dependencies.

```
npm install
```

To install geth instead, run


```
sudo add-apt-repository ppa:ethereum/ethereum -y
sudo apt-get-update
sudo apt-get install ethereum
```
For parity, use the one line installer 

```
bash <(curl https://get.parity.io -Lk)
```


## Quick Start

Write your contracts in `contracts/solidity`.

```javascript
contract Ticker {
	uint public val;
	function tick (){
		val += 1;
	}
}
```

Build Javascript prototypes for use on the command-line or in the browser.

```
$ npm run build
```

Start testrpc,


```
$ npm run testrpc
```

Start the console

```javascript
$ node console
localhost:8545 > web3.eth.accounts
[ '0xd07bfe65fa97bd9dc43a64a5f3fc9e3bb4917f96',
  '0x24168c80ceb039bacc8c706434db83084aa6c41a',
  '0x02d8931be91624d4a960d6af4f0297d47476cd6a',
  '0x62ced8963f400c2656514373b8b79a05b7990cd1',
  '0xd82098be0e476c4adf394653baa314788d09d6cf',
  '0x05f4988a4d3ed1044dedc1af56a674812ff72abf',
  '0x9107c893c049291630cc94131ef7ef0fc1243fef',
  '0x6a63b98aba82f2193c3569ca928e57e18646a92b',
  '0x7cb43f8aa3ffb2cb7256d5766c4ff29c60614ac5',
  '0x598ec12563e18088fbd30fd7eb30daa3ddbfc6e9' ]

```

Deploy your contracts.


```javascript
localhost:8545 > Ticker = new Ticker()
```

Invoke their functions.

```javascript
localhost:8545 > Ticker.tick()
'0x6b20a2cd8da357fd5cb851bea7f5896130bf7f2b753af877bddfbd11433a889d'
localhost:8545 > Ticker.val()
{ [String: '1'] s: 1, e: 0, c: [ 1 ] }
```

Stop testrpc

```
$ npm stop
```


To connect to a different RPC provider at the console, run `node console <host>:<port>`.

### Contracts

This folder contains Solidity source files, together with Javascript prototypes for simple usage.


### Web

This folder contains a simple html page using semantic UI that includes the javascript prototypes from the contracts folder. A suitable UI can then  be constructed to suit a demonstration of their interaction. 
