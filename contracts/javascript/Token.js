module.exports = Token;

var Web3 = require('web3');
var interface = [{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_initial_supply","type":"uint256"}],"type":"constructor"}]
;


function Token (provider) {
	if (typeof(provider) === "undefined")
			provider = "http://localhost:8545";

	this.provider = provider;
	var	web3 = new Web3(
			new Web3.providers.HttpProvider(provider));
		web3.eth.defaultAccount = web3.eth.accounts[0];

	var contract = web3.eth.contract(interface);
	contract.new({
		from: web3.eth.defaultAccount,
		data: '6060604052604051602080610201833981016040528080519060200190919050505b8060006000508190555080600160005060003373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055505b506101928061006f6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806370a0823114610047578063a9059cbb1461007857610042565b610002565b3461000257610062600480803590602001909190505061009e565b6040518082815260200191505060405180910390f35b346100025761009c60048080359060200190919080359060200190919050506100dc565b005b6000600160005060008373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505490506100d7565b919050565b80600160005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505410151561018d5780600160005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282825054039250508190555080600160005060008473ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828282505401925050819055505b5b505056',
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
