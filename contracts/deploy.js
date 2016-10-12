var Web3 = require('web3');
var interfaces = require('./compiled.json');


if (typeof web3 == "undefined") {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    	web3.eth.defaultAccount = web3.eth.accounts[0];
}


function deploy (name, args, callback) {
	var abi = JSON.parse(interfaces[name].abi);
	var contract = web3.eth.contract(abi);

	var _from = web3.eth.accounts[0];
	var _data = interfaces[name].bin;
	var _gas = 3000000;

    if (typeof args == "function") {
        callback = args;
        args = undefined;
    }

    if (typeof args === "undefined") args = '';
    else { try{args =  JSON.stringify(args); args = args.substring(1, args.length-1) + ',' }
           catch(err) {args = '';}}

    var eval_callback = (err, contract) => {
        if (typeof callback == "function")
           tx_callback(err,contract, name).then(callback);
        else
           tx_callback(err, contract, name);
        }



        call_str = 'contract.new(' + args + '{from: _from, data: _data, gas: _gas}, eval_callback)';       
        start = new Date().getTime();
        return  eval(call_str);
}

function tx_callback(err, contract, name) {
    return new Promise ((resolve, reject) => {
        if (err) reject(err);
        else {
            if (!contract.address)
               console.log("Tx Hash: " + contract.transactionHash);
            else {
                stop = new Date().getTime();
                console.log("Contract mined in " + (stop-start) + "ms.");
                console.log("Address: " + contract.address);
                resolve(contract);
            }
        }
    })
}



module.exports = deploy;
