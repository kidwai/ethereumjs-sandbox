var run = require('./run.js');
var fs = require('fs');
var web3 = run.web3();

function fs_callback (err, contents) { 
	if (err) { return console.log(err);}
	console.log(contents);}
function tx_callback(e, contract) {
    if (!e) {
	if (!contract.address) {
	    console.log("Contract transaction sent: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
	} else { 
	    console.log("Contract mined! Address: " + contract.address);
	}
   }}
function read_file(path) {return fs.readFileSync(path, 'utf8', fs_callback);}
function solc(source) { return web3.eth.compile.solidity(source);}
function make_contract(compiled) { return web3.eth.contract(compiled.info.abiDefinition); }
function build (name) {
	var source = read_file('./sol/' + name + '.sol');
	var compiled = solc(source)[name];
	var code = compiled.code;
	var con = make_contract(compiled);
	return {'contract': con, 'code': code};}

function deploy (c, args) {
	// the case where this is invoked directly by
	// name of the contract
	if (typeof c == "string") { return deploy(build(c), args);}
	else {
		con = c['contract'];
		code = c['code'];
		if (typeof args == "undefined") {
			return con.new({from:web3.eth.defaultAccount, data:code}, tx_callback);
		}
		return con.new(args, { from:web3.eth.defaultAccount,
							   data:code,
							   gas: 3000000},tx_callback);} 
}

function periodic_do (func, n, m) {
	setTimeout(clearInterval, n*m, 
				setInterval(function() {
					console.log('tick');
					func();
				}, n));
}



module.exports.tx_callback = tx_callback;
module.exports.build = build;
module.exports.deploy = deploy;
module.exports.periodic_do = periodic_do;
