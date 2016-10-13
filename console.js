const repl = require('repl');
var contracts = require('./contracts'),
    Web3 = require('web3'),
    arg = process.argv[2];

if (typeof(arg) === "undefined")
	provider = "http:\/\/localhost:8545";
else
	provider = arg;

session = repl.start({
	prompt: '> ',
	ignoreUndefined: true
});
connect(provider);
session.context.connect = connect;
var modules = contracts.load();
Object.keys(modules).forEach((module)=>{
	session.context[module] = modules[module];
});



function connect(provider) {
	if (typeof(provider) === "undefined")
		provider = "http:\/\/localhost:8545";
	session.context.web3 = new Web3(
		new Web3.providers.HttpProvider(provider));
}
