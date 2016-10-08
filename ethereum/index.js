const conf = require('./config.json');
var fs = require('fs');

function Node() {
	this.client = conf.default;
	this.flags = conf[conf.default].flags;
	this.start = Node.prototype.start;
	this.stop = Node.prototype.stop;
}



Node.prototype.start = function () {
	cmd = this.client;
	Object.keys(this.flags).forEach((flag)=> {
		if (this.flags[flag] !== "")
			cmd += " --" + flag + " " + this.flags[flag];
	});
	return cmd;
}

Node.prototype.stop = function () {

}


module.exports.Node = Node;
