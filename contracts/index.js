var build = require('./build');
var fs = require('fs');

files = fs.readdirSync('javascript');

files.forEach((f)=> {
	module.exports[f] = f;
});
