/*  Entry point to contract build and storage tools */
var Web3 = require('web3');
var fs = require('fs');
var exec = require('child_process').execFileSync;

if (typeof web3 == "undefined") {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	web3.eth.defaultAccount = web3.eth.coinbase;
}

/* Load cache contents */
interfaces = load('interfaces');
registry = load('registry');
contracts = get_contracts();

/* Get all contracts registered in the registry */
function get_contracts() {
	contracts = {};
	if (!registry)
		registry = load('registry');

	Object.keys(registry).forEach((address) => {
		name = registry[address].name;
		contract = contract_at(address, name);
		contracts[name] = contract;
	})
	return contracts;
}



/* Get contract by address and name */
function contract_at(address, name) {
	contract = web3.eth.contract(interfaces[name].abi);
	return contract.at(address);
}


/* Compiled and cache interfaces for all contracts in contracts/sol */
function build(name) {
	if (typeof name == "undefined")
		exec('make', ['-C', 'contracts/sol'])
	else
		exec('make', ['-C', 'contracts/sol', name])
	interfaces = load('interfaces');
}

/* Create new instance of contract of specified name,
 * optionally providing arguments to the contract 
 * constructor, or a callback function taking the
 * created contract as argument.
*/
function deploy(name, args, callback) {
	_callback = (err, contract) => {
		if (typeof callback == "function")
			tx_callback(err,contract,name, callback);
		else
			tx_callback(err, contract, name);
	}
	if (typeof interfaces == "undefined") {
		build();
		interfaces = load('interfaces');
	}
	contract = web3.eth.contract(interfaces[name].abi);
	code = interfaces[name].bin;

	if (typeof args === "undefined") args = '';
	else { try{args =  JSON.stringify(args); args = args.substring(1, args.length-1) + ',' }
			catch(err) {args = '';}}

	opts = '{from:web3.eth.defaultAccount, data:code, gas:3000000}, _callback)';
	call_str = 'contract.new(' + args + opts;
	start = new Date().getTime();
 	return  eval(call_str);
}


function tx_callback(err, contract, name, callback) {
	if (!registry)
		registry = load('registry');
	if (!err) {
		if (!contract.address) {
			console.log("Contract transaction sent. Waiting to be mined...");
			console.log("Transaction Hash: " + contract.transactionHash);
		}
		else {
			stop = new Date().getTime();
			console.log("Contract mined in " + (stop-start) + "ms.");
			console.log("Address: " + contract.address);
			code = web3.eth.getCode(contract.address);
			codeHash = web3.sha3(code);			
			registry[contract.address] = {
				"name": name,
				"codeHash": codeHash
			}
			store('registry', registry);
			contracts[name] = contract;
			if (typeof callback == "function")
				callback(contract);
		}
	}
}

/* Caching Functions */
function store(type, obj) {
	json = JSON.stringify(obj, null, "\t");
	fs.writeFileSync('contracts/cache/' + type + '.json', json);
}


function load(type) {
	if (!fs.existsSync('contracts/cache'))
		fs.mkdirSync('contracts/cache');

	Path = 'contracts/cache/' + type + '.json';
	if (!fs.existsSync(Path))
		return {};
	try {
		raw = fs.readFileSync('contracts/cache/' + type + '.json');
	} catch (err) {
		return {};
	}
	try {
		json = JSON.parse(raw, null, "\t");
	} catch (err) {
		return {}; 	// invalid cache file
	}
	if (type == "interfaces") {
		json = json.interfaces;
		Object.keys(json).forEach((type) => {
			json[type].abi = JSON.parse(json[type].abi)
		});
	}
	return json;
}


function watch (contract) {
	return 	contract.allEvents( (err, result) => {
		if (!err) {
			console.log(result);
		}
	})
}

function balance(addr) {
	return web3.eth.getBalance(addr);
}

function balances(addr_list) {
	for (i = 0 ; i < addr_list.length; i++) {
		console.log(balance(addr_list[i]));
	}
}


exports.build = build;
exports.deploy = deploy;
exports.contracts = contracts;
exports.watch = watch;
exports.balances = balances;
exports.balance = balance;
