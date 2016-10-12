## EthereumJS Sandbox

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

Build Javascript prototypes for use on the command-line or in the browser.

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
> 
```

Deploy your contracts.


```
> Ticker = new Ticker()
```

Invoke their functions.

``` 
> Ticker.tick()
'0x6b20a2cd8da357fd5cb851bea7f5896130bf7f2b753af877bddfbd11433a889d'
> Ticker.val()
{ [String: '1'] s: 1, e: 0, c: [ 1 ] }
```

Stop testrpc

```
$ npm stop
```