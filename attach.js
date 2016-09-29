var Contract = require('./utils/contract.js');
const repl = require('repl');



session = repl.start({
	prompt: '> ',
	ignoreUndefined: true
});



session.context.Contract = Contract;
