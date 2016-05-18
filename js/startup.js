var web3 = require('web3')
var fs = require('fs')
var web3 = new web3(new web3.providers.HttpProvider('http://localhost:8545'))

// array of accounts
var acc = web3.eth.accounts

function checkBalances() {
	acc.forEach( function(acc) {
		console.log(web3.fromWei(web3.eth.getBalance(acc)))	
	})
}
function fs_callback (e, contents) { console.log(contents);}
function get_source(path) { return fs.readFileSync(path, 'utf8', fs_callback);}
function solc(source) { return web3.eth.compile.solidity(source);}

function tx_callback(e, contract) {
    if (!e) {
	if (!contract.address) {
	    console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
	} else { 
	    console.log("Contract mined! Address: " + contract.address);
	}
    }
}
function contract(compiled) { return web3.eth.contract(compiled.info.abiDefinition); }

/* compiled source intro contract from path 
 * argument specifying contract name, in case
 * multiple contracts in one source file
*/
function build(path, name) {
	var source = get_source(path);
	var compiled = solc(source)[name];
	var code = compiled.code;
	var c = contract(compiled);
	return {'contract': c, 'code': code};
}


function deploy (c, ind, password, args) {
	web3.personal.unlockAccount(acc[ind], password);
	con = c['contract'];
	code = c['code'];
	if (typeof args == "undefined") {
		return con.new({from:acc[ind], data:code, gas:1000000}, tx_callback);
	}
	return con.new(args, {from:acc[ind], data:code, gas:1000000}, tx_callback);
}
