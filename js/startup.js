var web3 = require('web3')
var fs = require('fs')
var web3 = new web3(new web3.providers.HttpProvider('http://localhost:8545'))

if (web3.eth.accounts.length == 0 ){
	web3.personal.newAccount("lol")
	web3.personal.newAccount("haha")
	web3.personal.newAccount("lol")
}

var A = web3.eth.accounts[0]
var B = web3.eth.accounts[1]
var C = web3.eth.accounts[2]

function checkBalances() {
	web3.eth.accounts.forEach( function(acc) {
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
/* compiled and construct a contract directly from a path to a .sol file */
function build_and_deploy_greeter(path, greeting) { 
    var source = get_source(path);
    var compiled = solc(source);
    var greeter_compiled = compiled.greeter;
    var greeter_code = greeter_compiled.code;
    var greeter_contract = contract(greeter_compiled);
    return greeter_contract.new(greeting, {from: A, data: greeter_code, gas: 1000000}, tx_callback);
}

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

function deploy (c, args) {
	con = c['contract'];
	code = c['code'];
	if (typeof args == "undefined") {
		return con.new({from:A, data:code, gas:1000000}, tx_callback);
	}
	return con.new(args, {from:A, data:code, gas:1000000}, tx_callback);
}
