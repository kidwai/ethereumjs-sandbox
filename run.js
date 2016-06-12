const repl = require('repl');
var web3 = require('web3');
var fs = require('fs');
var test = require('./test.js')
web3 = new web3(new web3.providers.HttpProvider('http://localhost:8545'));
web3.eth.defaultAccount = web3.eth.coinbase;

interactive=false;
argument=false;
argv = process.argv;
L = argv.length;

// skip the first two, since these are node and run.js
contract = {'args': []};
for (i = 2 ; i < L; i++) {
	if (argv[i] == "interactive")
		interactive = true;
	else if (typeof contract.name !== 'undefined')
		contract.args[contract.args.length] = argv[i];
	else
		contract.name = argv[i];
}


deployed = {};
if (typeof contract.name !== 'undefined')
	deployed[contract.name] = deploy(contract.name);


if(interactive)
{
	session = repl.start('> ');
	session.context.web3 = web3;
	session.context.build = build;
	session.context.deploy = deploy;
	session.context.test = test;
}


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