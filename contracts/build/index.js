module.exports = build;

const SOLPATH = '../solidity';
const PRAGMA = "pragma solidity ^0.4.2;\n";

var solc = require('solc');
var fs = require('fs');

function build (){
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
	fs.writeFileSync('./compiled.json', JSON.stringify(result));
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
