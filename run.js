module.exports.web3 = connect;
const repl = require('repl');
var tools = require('./tools.js');


function connect () {
	var Web3 = require('web3');
	var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
	web3.eth.defaultAccount = web3.eth.coinbase;
	return web3;
}


if (process.argv.length > 2 
	&& process.argv[2] == 'interactive')
{
	session = repl.start('> ');
	session.context.web3 = this.web3();
	session.context.tools = tools;
}

