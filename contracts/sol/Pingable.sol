contract Pingable {

	uint last_ping;
	uint expiry;
	event Ping();
	event Death();

	function ping();
	function die();
}