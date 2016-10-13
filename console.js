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

<<<<<<< HEAD
connect(provider);
session.context.connect = connect;
=======
session.context.web3 = new Web3(
	new Web3.providers.HttpProvider(
		"http:\/\/" + HOST + ":" + PORT));


>>>>>>> 0d8043ca0259546a21048ebe49a8222bc4c18de4

var modules = contracts.load();
Object.keys(modules).forEach((module)=>{
	session.context[module] = modules[module];
});
<<<<<<< HEAD



function connect(provider) {
	if (typeof(provider) === "undefined")
		provider = "http:\/\/localhost:8545";
	session.context.web3 = new Web3(
		new Web3.providers.HttpProvider(provider));
}
=======
>>>>>>> 0d8043ca0259546a21048ebe49a8222bc4c18de4
