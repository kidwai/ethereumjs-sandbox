var Web3 = require('web3');

if (typeof web3 == "undefined")
	web3 = new Web3(new Web3.provider.HttpProvider("http://localhost:8545"));

function load () {
	instances = {};
	interfaces = {};
	fs.exists('../contracts/instances.json', () => {
		instances = require('../contracts/instances.json');
	});

	fs.exists('../contracts/interfaces.json', () => {
		interfaces = require('../contracts/interfaces.json').interfaces;
	})
}

function contracts () {
	load();
	contract_list = {};
	Object.keys(instances).forEach((address) => {
		contract_list[address] = at(address, instances[address]);
	});
	return contract_list;
}


function at(address, name) {
	return web3.eth.contract(abi(name)).at(address);
}


function abi(name) {
	return JSON.parse(interfaces[name].abi);
}

module.exports = contracts;
