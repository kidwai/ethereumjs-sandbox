const HOST = "127.0.01"; 	
const PORT = 8545;

var info = require('./contracts.json')["<contract_name>"];
var Web3 = require('web3');
info.interface = JSON.parse(info.interface);





module.exports.new = function () {
	var args = Array.from(arguments);
	contract = deploy({
		data: info.bytecode,
		gas: info.gasEstimates.creation[1]
	});
	return contract;
}
if (typeof(web3)  === "undefined") {
	web3 = new Web3(
		new Web3.providers.HttpProvider(
			"http://" + HOST + ":" + PORT));
	web3.eth.defaultAccount = web3.eth.accounts[0];
}

function deploy (args)  {
	if (typeof(web3) === "undefined")
		connect(HOST,PORT);
	contract = web3.eth.contract(info.interface);

	keys = Object.keys(args);
	Tx = {};
	for (i = 0; i < keys.length; i++) {
		Tx[keys[i]] = args[keys[i]];
	}

	address = sendTx(Tx);
	return contract.at(address);
}



function sendTx () {
	tx_obj = {};
	if (typeof(args) !== "undefined" )  {
		Object.keys(args).forEach((arg)=>{
			tx_obj[arg] = args[arg];
		})
	}

	txHash = web3.eth.sendTransaction(tx_obj);

	if (!tx_obj.data)
		return txHash;

	return getTxReceipt(txHash).contractAddress	;
}

function getTxReceipt(txHash) {return web3.eth.getTransactionReceipt(txHash);}