const repl = require('repl');
var contracts = require('./contracts'),
    Web3 = require('web3'),
    arg = process.argv[2];

if (typeof(arg) === "undefined") {
	HOST = "localhost";
	PORT = 8545;
} else {
	HOST = arg.split(':')[0];
	PORT = arg.split(':')[1];
}



session = repl.start({
	prompt: HOST + ':' + PORT + ' > ',
	ignoreUndefined: true
});

session.context.web3 = new Web3(
	new Web3.providers.HttpProvider(
		"http://" + HOST + ":" + PORT));



var modules = contracts.load();
Object.keys(modules).forEach((module)=>{
	session.context[module] = modules[module];
});

