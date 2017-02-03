## ethereumjs-sandbox

A simple environment to get start with Ethereum.

### TL;DR

```
$ git clone https://github.com/kidwai/ethereumjs-sandbox
$ npm install
```


### Write Contracts

Write your contracts in `contracts/solidity`.

```javascript
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

```javascript
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

To modify the sessions web3 object, use `connect`


```javascript 
> connect()
> web3.eth.accounts
[ '0xd5ae02ae9518c9145cb03a571aa91fe7da465ccf',
  '0x6f30550cbceacab1bee7415dcfbbadffa74cbb2b',
  '0xf2e36370f561b13b82be5ce37a6897c11aaebb35',
  '0xc190125e14a1d7a5bc1452853e89f8c5046dc8b0',
  '0x4e8202d4e98a72c63c79bb6f432651c1aaddaaf8',
  '0x678b9d58213bba52fb37592e983a558a9262f36e',
  '0xaea35a2082957802b6ad9d40915b334e87750dcd',
  '0x46e834598a3d84b127bb43371e6acf670181b0c2',
  '0x3b75f048c51381ab81a957c9bb1ceb4075d7ddb5',
  '0x014e3d31ba46d7258e208314db807dfeb0534546' ]
> connect("http://localhost:8546")
> web3.eth.accounts
[ '0xd8182ab532270bc51d3234611c7501f5dc558298',
  '0x1ab3eaedbbfa5afc3574160decae8c5152257463' ]
```

Deploy your contracts to the current provider.

```javascript
> T = new Ticker()
Tx Hash: 0xb433d1b4df5649b2632e1bedf487f36696cf821e40fb990c9b92054badcd11b9
Contract mined: 0x26402dcf58927cf5e53949e27cfbe297697c328c
localhost:8545 > Ticker.tick()
'0xaa504f1438d6ae60296d1e580a97334bc7e9e8d58b4af696ee68e9e0db06320e'
localhost:8545 > Ticker.val()
{ [String: '1'] s: 1, e: 0, c: [ 1 ] }
```

Deploy your contracts to a different provider, without invoking `connect`.

```javascript
> T = new Ticker("http://localhost:8546")
```

Here is an example session after running `npm run testrpc` and `geth --rpc --rpcport 8546 --unlock 0`.


```javascript
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

To stop testrpc, run `npm stop`.


To use these in the browser, run `npm run browserify`. See the html in the `web` folder for a simple page using semantic UI. More documentation to come.
