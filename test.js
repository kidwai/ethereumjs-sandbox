const repl = require('repl');
var Web3 = require('web3');
var tools = require('./tools.js');


if (typeof web3 == "undefined"){
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    web3.eth.defaultAccount = web3.eth.coinbase; 
}



contract_name =  process.argv[2]; 
func_name =  process.argv[3];
total_secs = process.argv[4];

contract = tools.deploy(contract_name, function() {
	console.log('Starting ' + total_secs + 's tx test.');
	console.log('...');
    txps = tools.txps(contract[func_name], total_secs);
    console.log('Done. txps = ' + txps);
});


if (process.argv[5] && process.argv[5] == "console") {
	session = repl.start('> ');
	session.context.tools = tools;
	session.context.contract = contract;
}