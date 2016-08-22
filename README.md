## Ethereumjs Sandbox

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

If you want to use geth instead of testrpc,


```
sudo add-apt-repository ppa:ethereum/ethereum -y
sudo apt-get-update
sudo apt-get install ethereum
```

will install go-ethereum. 

To compile with `make`, install `solc`, the solidity command-line compiler:

```
sudo apt-get install solc
```

If you run into issues with solc, see [this](https://github.com/ethereum/solidity/issues/865) thread.




## Usage

Install npm dependencies.

```
npm install
```

Start testrpc with

```
npm start
```

Compile the contracts in the `contracts` directory with solc,

```
make
```



To connect to the provider in an REPL session, run

```
node attach
```

Deploy some contracts.

```javascript
> ticker = deploy('Ticker')
Tx Hash: 0xe6a45f231dee6c33acc15c69542e1801ac1375bb57f057637fa3c7a22be6ba15
Contract mined in 643ms.
Address: 0x8d5a91745473b985b442ca202219707dee946b1f

> token = deploy('Token', [1000])
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

> token.transfer(accounts(1), 100) // note accounts(1) is shorthand for web3.eth.accounts[0]
'0x93704986151e83a97d52003f2250b708cf743c81ec91027bf756f1aacd888735'
> token.balanceOf(accounts(1))
{ [String: '100'] s: 1, e: 2, c: [ 100 ] }
```

Deploy a contract and operate on it immediately.


```javascript
> deploy('Token', [10000], (token) => { token.transfer(accounts(1), 100)})
> Tx Hash: 0x6eb1edd25551337e2a91cf3ae5cfdca71ab79f9c10247981add6ab16c0426e7b
Contract mined in 554ms.
Address: 0x707624850e6e84e61164b4953b7a30cf71e15057

> token.balanceOf(accounts(1))
{ [String: '100'] s: 1, e: 2, c: [ 100 ] }
```


Deploy contract-dependent contracts in a sequence. Note, `accounts(i)` is a shorthand for `web3.eth.accounts[i]`.

```javascript
> deploy('Token', [100000], (token) => { deploy('Wallet', [token.address]) })
> Tx Hash: 0xcde85e8c7abbc8b5c996760c82ec1330eea25a0ae7fa39a9b304d5ab4ccace0f
Contract mined in 608ms.
Address: 0x79ce8d9e61ca35c0be5eebef5916e25c87f10a2f
Tx Hash: 0xc89caf2acab1694f79b8493c41175d85a5f0dcab6d1363f9175c27111cba1241
Contract mined in 555ms.
Address: 0x6dd14736b5308bcf9669c24d3d21c2a0a01ba424

```

Retrieve the wallet that was just deployed by address.


```javascript
> wallet = contracts()['0x6dd14736b5308bcf9669c24d3d21c2a0a01ba424']
```


Copying and pasting addresses is a pain. Maybe I will add some
sort of aliasing.
