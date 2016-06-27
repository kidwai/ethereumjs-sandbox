var Web3 = require('web3');
var fs = require('fs');


if (typeof web3 == "undefined"){
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    web3.eth.defaultAccount = web3.eth.coinbase; 
}


/* output data periodically */
function data_stream (period, duration) {
	fname = '' + period + '_' + duration + '.csv';
	setTimeout(clearInterval, (duration+1)*1000, 
				setInterval(function() { 
					fs.appendFile(fname, get_state(), function(){});
				}, period*1000));
} 


function get_state() {
	blocknum = web3.eth.blockNumber;
	block = web3.eth.getBlock(blocknum);

	data = Date.now() + ',' +
		   blocknum + ',' +
		   web3.eth.getBlockTransactionCount(blocknum) + ',' +
		   block.size + ',' +
		   block.gasLimit + ',' +
		   block.gasUsed + ',' +
		   web3.eth.hashrate + ',' +
		   web3.net.peerCount + '\n'
	return data;
}


module.exports.data_stream = data_stream;
