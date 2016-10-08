var Web3 = require('web3');
var contract_info = require('./contracts.json').;
var functionHashes = contract_info.functionHashes;
var bin = contract_info.bytecode;
var interface = contract_info.interface;
var gasEstimates = contract_info.gasEstimates;
var HOST = "127.0.01";
var PORT = 8545;

if (typeof(web3)  === "undefined") {
	web3 = new Web3(
		new Web3.providers.HttpProvider(
			"http://" + HOST + ":" + PORT));
}

function  () {
	o = Object.create(null);
	o.properties = {
		bytecode: bytecode,
		abi: abi,
		functionHashes: functionHashes,
		gasEstimates: gasEstimates
	}

	o.new = () => {
		var args = Array.from(arguments);
		return deploy(args);
	}

	o.at = (address) => {
		return web3.eth.contract(this.abi).at(address);
	}
	return o;
}




function deploy (args)  {
	contract = web3.eth.contract(interface);

	keys = Object.keys(args);
	Tx = {};
	for (i = 0; i < keys.length; i++) {
		Tx[keys[i]] = args[keys[i]];
	}

	address = sendTx(Tx);
	return contract.at(address);
}



function sendTx () {
	if (args) {
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




module.exports = ;
