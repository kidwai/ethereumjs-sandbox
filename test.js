/* Function to execute a given function
 * every n milliseconds, for m periods.
*/
module.exports.periodic_do = function (func, n, m) {
	setTimeout(clearInterval, n*m, 
				setInterval(function() {
					console.log('tick');
					func();
				}, n));
}

