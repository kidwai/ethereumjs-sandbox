module.exports = <NAME>;

var Web3 = require('web3');



var interface = <INTERFACE>;


if (typeof (window) !== "undefined") {
	var web3 = typeof window.web3 !== 'undefined' ? window.web3 : new Web3();
	if (typeof web3.currentProvider !== 'undefined')
		web3.setProvider(window.web3.currentProvider)
	else web3.setProvider(
			new Web3.providers.HttpProvider(
				"http:\/\/<PROVIDER>"));	
} else {
	if (typeof (web3) === "undefined") {
		web3 = new Web3(new Web3.providers.HttpProvider(
			"http:\/\/<PROVIDER>"));
		web3.eth.defaultAccount = web3.eth.accounts[0];
	}
}
function <NAME> () {
	var contract = web3.eth.contract(interface);
	contract.new({
		from: web3.eth.accounts[0],
		data: '<BYTECODE>',
		gas: 3000000},
		(err,contract) => {
			if (contract.address) {
				Object.keys(contract).forEach((key)=>{
					this[key] = contract[key];
				})

			}
		}
	)
}
