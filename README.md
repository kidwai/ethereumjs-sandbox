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

If you want to use geth instead of testrpc,


```
sudo add-apt-repository ppa:ethereum/ethereum -y
sudo apt-get-update
sudo apt-get install ethereum
```

will install go-ethereum. 

## Quick Start

Write your contracts in `contracts/solidity`.

```
contract Ticker {
	uint public val;
	function tick (){
		val += 1;
	}
}
```

Build Javascript prototypes.

```
$ npm run build
```

Start testrpc,


```
$ npm run testrpc
```

Start the console

```
$ node console
> web3.eth.accounts
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

```
> Ticker = new Ticker()
Tx Hash: 0xb433d1b4df5649b2632e1bedf487f36696cf821e40fb990c9b92054badcd11b9
Contract mined: 0x26402dcf58927cf5e53949e27cfbe297697c328c
localhost:8545 > Ticker.tick()
'0xaa504f1438d6ae60296d1e580a97334bc7e9e8d58b4af696ee68e9e0db06320e'
localhost:8545 > Ticker.val()
{ [String: '1'] s: 1, e: 0, c: [ 1 ] }
```


If, additionally, we run geth with 

```
$ geth --rpc --rpcport 8546 --unlock 0
```

We can deploy contracts here with


```
> Ticker = new Ticker("http://localhost:8546")
```

Here is an example session using both testrpc and geth.

```
> test_ticker = new Ticker()
Ticker { provider: 'http://localhost:8545' }
> Tx Hash: 0xf862b5884eb992147a1ede71f2dd6d78ca65b936adf186d57f079e1d04085984
Contract mined: 0x6cee6639d4bafc627516db5e12dace4ae88f8f01

> geth_ticker = new Ticker("http://localhost:8546")
Ticker { provider: 'http://localhost:8546' }
> Tx Hash: 0xb1cdd16f29d578fa98479d1dfddfb793e6526f8a7f7d23d746c99675205fe13d

> Contract mined: 0xf6d2735320996db4ce6b140ae0bbdf500d971dab

> test_ticker.tick()
'0x0efa04ca97428189cb35e57fc9f85e6c75b5940cdb32e6426936fbf5d52ac844'
> test_ticker.val()
{ [String: '1'] s: 1, e: 0, c: [ 1 ] }
> geth_ticker.tick()
'0x991f56f536486656135f0d4dca24ab7a5cef83ad8daa3d7fd4de08fa654eb20b'
> geth_ticker.val()
{ [String: '1'] s: 1, e: 0, c: [ 1 ] }
```


To use these in the browser, run `npm run browserify`. See the html in the `web` folder for a simple page using semantic UI. More documentation to come.