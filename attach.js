var ethnode = require('./ethnode');
const repl = require('repl');



session = repl.start({
	prompt: '> ',
	ignoreUndefined: true
});

session.context.ethnode = ethnode;
