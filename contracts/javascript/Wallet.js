module.exports = Wallet;

var Web3 = require('web3');



var interface = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_token_addr","type":"address"}],"type":"constructor"}]
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
function Wallet () {
	var contract = web3.eth.contract(interface);
	contract.new({
		from: web3.eth.accounts[0],
		data: '606060405260405160208061031b833981016040528080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b50610292806100896000396000f360606040526000357c010000000000000000000000000000000000000000000000000000000090048063a9059cbb14610047578063b69ef8a81461006d57610042565b610002565b346100025761006b6004808035906020019091908035906020019091905050610095565b005b346100025761007f60048050506101aa565b6040518082815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156101a057600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8383604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050600060405180830381600087803b156100025760325a03f115610002575050505b6101a5565b610002565b5b5050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150905061028f565b9056',
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
