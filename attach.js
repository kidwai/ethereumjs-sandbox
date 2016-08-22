var build = require('./utils/build.js');
var deploy = require('./utils/deploy.js');
var contracts = require('./utils/contracts.js');
var accounts = require('./utils/accounts.js');
const repl = require('repl');



session = repl.start({
	prompt: '> ',
	ignoreUndefined: true
});


session.context.build = build;
session.context.deploy = deploy;
session.context.contracts = contracts;
session.context.accounts = accounts;
