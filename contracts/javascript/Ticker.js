module.exports = Ticker;

var Web3 = require('web3');
var interface = [{"constant":true,"inputs":[],"name":"val","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"tick","outputs":[],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"tick_val","type":"uint256"}],"name":"Tick","type":"event"}]
;


function Ticker (provider) {
	if (typeof(provider) === "undefined")
			provider = "http://localhost:8545";

	this.provider = provider;
	var	web3 = new Web3(
			new Web3.providers.HttpProvider(provider));
		web3.eth.defaultAccount = web3.eth.accounts[0];

	var contract = web3.eth.contract(interface);
	contract.new({
		from: web3.eth.defaultAccount,
		data: '60606040525b60006000600050819055505b60e48061001e6000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480633c6bb4361460435780633eaf5d9f14606857603f565b6002565b34600257605260048050506079565b6040518082815260200191505060405180910390f35b34600257607760048050506082565b005b60006000505481565b600160006000828282505401925050819055506000600050543373ffffffffffffffffffffffffffffffffffffffff167f4003cdd494419a986508924f0bfa114ebae78cffffde1ba3515b9dc78bbe700760405180905060405180910390a35b56',
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
