var tools = require('./utils/tools.js');
var Web3 = require('web3');
const repl = require('repl');

/* Connect to local node */
if (typeof web3 == "undefined"){
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    web3.eth.defaultAccount = web3.eth.coinbase;
}



whos = [];
session = repl.start({
	prompt:'> ',
	ignoreUndefined: true
});
session.context.web3 = web3;
whos.push('web3');

Object.keys(tools).forEach((tool) => {
	session.context[tool] = tools[tool];
})