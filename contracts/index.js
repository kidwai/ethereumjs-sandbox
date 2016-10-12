const SOLPATH = 'contracts/solidity';
const JSPATH = 'contracts/javascript';
const PRAGMA = "pragma solidity ^0.4.2;\n";

var solc = require('solc');
var fs = require('fs');


module.exports.load =  () => {
	files = fs.readdirSync(JSPATH);

	result = {};
	for(i = 0 ; i < files.length; i++) {
		module = files[i].split('.')[0];
		if (module === "template")
			continue;
		file = './javascript/' + files[i];
		result[module] = require(file);
	}
	return result;
}


module.exports.build = (provider) => {
	compiled = compile();
	fs.writeFileSync('./contracts/app.js', '');
	Object.keys(compiled).forEach((key)=>{
		prototype(key, compiled[key], provider);
		fs.appendFileSync('./contracts/app.js', key + '= require(\'./javascript/' + key +  '\');\n')
	});
}

function prototype(name, info, provider) {
	var src = fs.readFileSync(JSPATH + '/template.js', 'utf8');


	src = src.replace("<NAME>", name);
	src = src.replace("<NAME>", name);
	src = src.replace("<BYTECODE>", info.bytecode);
	src = src.replace("<INTERFACE>", info.interface);
	if (typeof (provider) === "undefined")
		provider = "localhost:8545";
	
	fs.writeFileSync(JSPATH + '/' + name + '.js', src);
}



function compile (){
	src = cat_dir(SOLPATH, 'sol');
	src = clean_imports(src);
	contracts = solc.compile(src).contracts;
	result = {};
	Object.keys(contracts).forEach((key)=>{
		contract = contracts[key];

		result[key] = {};
		result[key].bytecode = contract.bytecode;
		result[key].interface = contract.interface;
		result[key].functionHashes = contract.functionHashes;
		result[key].gasEstimates = contract.gasEstimates;
	});
	return result;
}

function cat_dir(dir, ext) {
	files = fs.readdirSync(dir);

	src = "";
	for (i=0; i < files.length; i++) {
		file = files[i];

		name = file.split('.')[0];
		extension = file.split('.')[1];
		if (extension !== ext)
			continue;

		src = src + fs.readFileSync(dir + '/' + file, 'utf8')
	}
	return src;
}

/* remove all import statements */
function clean_imports (src) {
	i = src.indexOf("import");
	if (i == -1)
		return src;

	tail = src.substring(i);
	j = tail.indexOf(';');
	statement = tail.substring(0,j+1);
	src = src.replace(statement, "");
	return clean_imports(src);
}
