module.exports = Owned;

var Web3 = require('web3');
var interface = [{"inputs":[],"type":"constructor"}]
;


function Owned (provider) {
	if (typeof(provider) === "undefined")
			provider = "http://localhost:8545";

	this.provider = provider;
	var	web3 = new Web3(
			new Web3.providers.HttpProvider(provider));
		web3.eth.defaultAccount = web3.eth.accounts[0];

	var contract = web3.eth.contract(interface);
	contract.new({
		from: web3.eth.defaultAccount,
		data: '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b600c80603d6000396000f360606040526008565b600256',
		gas: 3000000},
		(err,contract) => {
			if (contract.address) {
				console.log("Contract mined: " + contract.address);
				Object.keys(contract).forEach((key)=>{
					this[key] = () => {
						var web3 = new Web3(new Web3.providers.HttpProvider(this.provider));
						web3.eth.defaultAccount = web3.eth.accounts[0];
						if (typeof(contract[key]) === "function")
							return contract[key](arguments);
						return contract[key];
				}
				});
			} else {
				console.log("Tx Hash: " + contract.transactionHash);
			}
		}
	)
}
