var Tools = require('../utils/tools.js');
var Web3 = require('web3');

mo = web3.eth.accounts[0];
mom = web3.eth.accounts[1];
dad = web3.eth.accounts[2];


Tools.deploy('Death', (death) => {
	Tools.deploy('Pinger', (pinger) => {
		death.startUAR(mom, pinger, 10000);
	});	
});