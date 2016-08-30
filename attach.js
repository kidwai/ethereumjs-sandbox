var build = require('./utils/build.js');
var deploy = require('./utils/deploy.js');
var contracts = require('./utils/contracts.js');
var acc = require('./utils/accounts.js');
var watch = require('./utils/watch.js');
const repl = require('repl');



session = repl.start({
	prompt: '> ',
	ignoreUndefined: true
});


session.context.build = build;
session.context.deploy = deploy;
session.context.contracts = contracts;
session.context.accounts = acc;
session.context.watch = watch;
