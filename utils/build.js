var solc = require('solc');
var glob = require('glob-fs')({gitignore:true});
var fs = require('fs');

function compile (input) {
	output =  solc.compile(input);
	interfaces = {};
	for (contractName in output.contracts) {
		interfaces[contractName] = {
			"abi": output.contracts[contractName].interface,
			"bin": output.contracts[contractName].bytecode
		}
	}
	return interfaces;
}


function build (fname) {
	var interfaces;
	try {
		interfaces = require('./contracts/interfaces.json');
	} catch (err) {
		interfaces = {};
	}
	if (typeof fname == "undefined") {
		files = glob.readdirSync('./contracts/*.sol');
		files.forEach((file)=>{
			build(file);
		});
	}
	else {
		input = fs.readFileSync(fname, 'utf8');
		interfaces = compile(input);
		fs.writeFile('./contracts/interfaces.json', JSON.stringify(interfaces));
	}
}

module.exports = build;
