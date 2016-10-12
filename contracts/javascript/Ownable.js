module.exports = Ownable;

var Web3 = require('web3');



var interface = []
;


if (typeof (window) !== "undefined") {
	var web3 = typeof window.web3 !== 'undefined' ? window.web3 : new Web3();
	if (typeof web3.currentProvider !== 'undefined')
		web3.setProvider(window.web3.currentProvider)
	else web3.setProvider(
			new Web3.providers.HttpProvider(
				"http:\/\/localhost:8545"));	
} else {
	if (typeof (web3) === "undefined") {
		web3 = new Web3(new Web3.providers.HttpProvider(
			"http:\/\/localhost:8545"));
		web3.eth.defaultAccount = web3.eth.accounts[0];
	}
}
function Ownable () {
	var contract = web3.eth.contract(interface);
	contract.new({
		from: web3.eth.accounts[0],
		data: '6060604052600c8060106000396000f360606040526008565b600256',
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
