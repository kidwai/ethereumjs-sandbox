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
function txps (func, time) {
	ms = time*1000;
	start = Date.now();
	i = 0;
	while (Date.now() - start < ms) {
		func();
		i++;
	}
	return i/time;
}

/* output data periodically */
function data_stream (fout, period, duration) {
	setTimeout(clearInterval, duration*1000, 
				setInterval(function() { 
					fs.appendFile(fout, get_state(), function(){});
				}, period*1000));
} 


function get_state() {
	blocknum = web3.eth.blockNumber;
	block = web3.eth.getBlock(blocknum);

	data = Date.now() + ',' +
		   blocknum + ',' +
		   web3.eth.getBlockTransactionCount(blocknum) + ',' +
		   block.difficulty + ',' +
		   block.size + ',' +
		   block.gasLimit + ',' +
		   block.gasUsed + ',' +
		   web3.eth.gasPrice + ',' +
		   web3.eth.hashrate + ',' +
		   web3.net.peerCount + '\n'
	return data;
}


module.exports.build = build;
module.exports.deploy = deploy;
module.exports.txps = txps;
module.exports.data_stream = data_stream;


if (process.argv[2])
{
	if (process.argv[2] == "console") {
    session = repl.start('> ');
    session.context.tools = this;
	} 
	else if (process.argv[2] == "monitor") {
		fout = 'data.csv';
		period = 10;
		duration = 10*60;


		if (process.argv[3])
			fout = process.argv[3];
		if (process.argv[4])
			period = process.argv[4];
		if (process.argv[5])
			duration = process.argv[5];
		data_stream(fout, period, duration);
	}
}