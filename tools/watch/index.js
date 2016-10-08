module.exports =  (contract, eventName, fields) => {
	return contract[eventName]((err, res) => {
		if(!err) {
			if (typeof fields == "undefined")
				console.log(res.args);
			else {
				for (var i = 0; i < fields.length; i++) {
					console.log("%s:%s", fields[i], res.args[fields[i]]);
				}
			}
		}
	})
}
