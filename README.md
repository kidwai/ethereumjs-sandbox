## Motivation

* While learning the basics of Ethereum and Solidity, I frequently wrapped tasks in scripts. After joining [Rubix](https://rubixbydeloitte.com) to work with prototyping Dapps, these became useful in our work, so I was encouraged to continue working on them.


* There are [other frameworks](http://ethereum.stackexchange.com/questions/607/how-to-unit-test-smart-contracts)
written by better developers than myself. The main reason I prefer to use this is because it was extremely easy to make, and can hence be reconstructed for explanatory purposes. I have also found it more instructive to stick with just the command-line and a text editor for now.


## Usage

Install depenencies with `npm install`, then start a geth node with 5 unlocked accounts:

```
$ geth/start
Initializing genesis block...
I0720 02:40:53.489953 ethdb/database.go:82] Alloted 16MB cache and 16 file handles to /home/momo/.ethereum/chaindata
I0720 02:40:53.523530 cmd/geth/main.go:304] successfully wrote genesis block and/or chain rule set: 8b1f2271ac3d51f7ca371b8e633e8f1625b64fb4bad3a158cc3da8157dfdaa14

Creating 5 accounts...
Address: {f7856892d372649066ca36b69db9f0166fe4ee70}
Address: {c984314cbda3982a26d088dbcbd8150a6d0bab7e}
Address: {e4af6aaae10f46416fd21a13299d256bbbb64346}
Address: {79c95d366d149b354b950a8f360f0e6b50e538f7}
Address: {f9e877bac83a1a8e3e68249e468f0a05f3513ca3}

Starting geth node...
See geth.log for details.
```

After a few seconds, geth will have set up the RPC interface, and you can connect with `node console`. It will take some time to generate
the DAG file. To check the progress, use `tail -f geth/geth.log`. <br>

Once that's done, you can deploy your contracts and execute their functions. Note: your contracts 
and their state will persist after you exit the console. They will be refreshed using `contracts/cache`.

In the provided `contracts/sol`directory is the following simple contract:

```javascript
contract ticker {
    uint public val;

    function tick () { val += 1; }
}
```

You can deploy it then invoke its functions easily.

```javascript
> build()
> deploy('ticker')
> Contract transaction sent. Waiting to be mined...
Transaction Hash: 0x3f2c8e3e292330592e815c5c49fee5ae3487f09d42ec644b50269992fabbc7f1
Contract mined in 657ms.
Address: 0x7ee1abfd1491f93e7a39809007cde0e3e4db03cd

> contracts.ticker.val()
{ [String: '0'] s: 1, e: 0, c: [ 0 ] }
> contracts.ticker.tick()
'0xc9aae7b721a55c26c2cd5de09df5f93ee950b43624b1abdfc2daf0321f8e90bc'
> contracts.ticker.val()
{ [String: '1'] s: 1, e: 0, c: [ 1 ] }
```

You can exit your REPL session with `.exit`, and stop your node with `geth/stop`, and your contracts will still be in tact.


## Reference

* **console** - Entry point to REPL session, with exports from tools available directly, and the usual web3 API.
* **tools** - Exposes functions for building and deploying contracts located in the `contracts/sol` directory, caching interfaces and instance information to `contracts/cache`.
    * **build** - Compiles all contracts in the `contracts/sol` directory, populating the `interfaces` object defined below. Contents are stored in `contracts/cache/interfaces.json`, overwriting any existing content. This should should be extended to specify only specific file names or contract names, and then to inserting into the cache without necessarily overwriting.
    * **interfaces** - Contains the abi, code, and code hash of each compiled contract. Synchronized with `contracts/cache/interfaces.json`.
    * **deploy** - Creates a new instance of a contract with the provided arguments, and populates the `contracts` object defined below. If the name supplied to deploy does not exist as an entry in the interfaces object, `build` will be run first. Each deployed contract is added to the registry, defined below. 
    * **contracts** -  Instances of deployed contracts. Loaded on startup from info contained in contract registry.
  * **registry** - Object containing contract addresses as keys to subobjects of name and codeHash of the corresponding deployed contract. Loaded on startup to populate the contracts object.

### Geth

* **start** - Purges existing geth node, then runs a geth node with default configuration for testing. This automatically creates 5 new accounts, then starts a geth node with them unlocked. 
* **stop** Kill currently active geth node.
* **purge** - Kill currently active geth node and wipe the datadir. The datadir used for now is the default `~/.ethereum`. To remove the log file, or the ethash, run with args `log`, `ethash`, or both. 
