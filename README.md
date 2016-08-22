## ethereumjs sandbox

* While learning the basics of Ethereum and Solidity, I frequently wrapped tasks in scripts. After joining [Rubix](https://rubixbydeloitte.com) to work with prototyping Dapps, these became useful in our work, so I was encouraged to continue working on them.


* There are [other frameworks](http://ethereum.stackexchange.com/questions/607/how-to-unit-test-smart-contracts)
written by better developers than myself. The main reason I prefer to use this is because it was extremely easy to make, and can hence be reconstructed for explanatory purposes. I have also found it more instructive to stick with just the command-line and a text editor for now.


## Installation

Clone this repository.

```
git clone https://github.com/kidwai/ethereumjs-sandbox
```

Install node dependencies.

```
npm install
```

If you want to use an implementation of Ethereum instead of testrpc,


```
geth/install
```

will install go-ethereum. 

To compile with `make`, install `solc`, the solidity command-line compiler:

```
sudo apt-get install solc
```

If you run into issues with solc, see [this](https://github.com/ethereum/solidity/issues/865) thread.


To compile with the nodejs solidity compiler, run `make js`. This will be slower, but will produce
the same result.



## Usage

Start testrpc with

```
npm start testrpc
```

or start geth with

```
geth/start
```

To connect to the provider in an REPL session, run

```
node attach
```


Deploy some contracts.

```javascript
> ticker = deploy('Ticker')
> Tx Hash: 0xa5a0fdaeb18ee84ca28ece65db7c8cb0acaecbc587dcc2a9d14dd19330750bd9
Contract mined in 620ms.
Address: 0x60c3769f17e421db4b2ff53308b0c99d09be8ae0

> token deploy('Token', [1000])
> Tx Hash: 0x15721509c4a3d15f90005b89dcdd281cbecc9696ee6c52f5a38cf1a4009a9190
Contract mined in 574ms.
Address: 0x48b4ad1ba4633878cd585de053d5e0cbb9821397
```

Invoke their functions.

```javascript
> ticker.tick()
'0xaa333b819f26a16422131ef7a0ef781fba074c16edc312d9c696adf0e9959472'
> ticker.val()
{ [String: '1'] s: 1, e: 0, c: [ 1 ] }
```

```javascript

```



```javascript
> deploy
```
