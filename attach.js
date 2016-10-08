var tools = require('./tools');
var contracts = require('./contracts');
const repl = require('repl');



session = repl.start({
	prompt: '> ',
	ignoreUndefined: true
});

session.context.contracts = contracts;
session.context.tools = tools;
