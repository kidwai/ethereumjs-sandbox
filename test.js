const repl = require('repl');
var Web3 = require('web3');
var tools = require('./tools.js');


if (typeof web3 == "undefined"){
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    web3.eth.defaultAccount = web3.eth.coinbase; 
}



contract_name = process.argv[2];
func_name = process.argv[3];
txps = process.argv[4];
total_secs = process.argv[5];
check = process.argv[6]
period = 1/txps*1000;
clear_time = total_secs*1000 + period/10;


/* execute the desired function at a rate of txps 
 * for total_secs seconds
*/
contract = tools.deploy(contract_name, function() {
    tools.periodic_do(contract[func_name],
                      period,
                      clear_time
                      });
});

session = repl.start('> ');
session.context.contract = contract;
session.context.tools = tools;