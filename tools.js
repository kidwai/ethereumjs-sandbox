const repl = require('repl');
var Web3 = require('web3');
var fs = require('fs');

if (typeof web3 == "undefined"){
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    web3.eth.defaultAccount = web3.eth.coinbase; 
}



function fs_callback (err, contents) { 
	if (err) { return console.log(err);}
	console.log(contents);}
function tx_callback(e, contract, _callback) {
    if (!e) {
    if (!contract.address) {
        console.log("Contract transaction sent: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
    } else { 
        console.log("Contract mined! Address: " + contract.address);
        if (typeof (_callback) !== "undefined")
        	 _callback();
    }
   }
}
function read_file(path) {return fs.readFileSync(path, 'utf8', fs_callback);}
function solc(source) { return web3.eth.compile.solidity(source);}
function make_contract(compiled) { return web3.eth.contract(compiled.info.abiDefinition); }
function build (name) {
	var source = read_file('./sol/' + name + '.sol');
	var compiled = solc(source)[name];
	var code = compiled.code;
	var con = make_contract(compiled);
	return {'contract': con, 'code': code};}
function deploy (name, _callback) {
	b = build(name);
	if (typeof (_callback) == "undefined" )
		callback = tx_callback;
	else
		callback = function (e, contract) { 
			tx_callback(e, contract, _callback);
		}

	return b.contract.new({from: web3.eth.defaultAccount,
					data: b.code,
					gas: 3000000},
					callback)
}

function periodic_do(func, period, clear_time, _callback) {
    setTimeout(clearInterval, clear_time,
        setInterval(func,
                    period));
    setTimeout(_callback, clear_time + 5000);
}


module.exports.periodic_do = periodic_do;
module.exports.build = build;
module.exports.deploy = deploy;



if (process.argv[2] && process.argv[2] == "console") {
    session = repl.start('> ');
    session.context.periodic_do = periodic_do;
}