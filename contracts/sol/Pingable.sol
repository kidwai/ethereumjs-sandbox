import "Ownable.sol";

contract Pingable is Ownable{

	uint last_ping;
	event Ping(address indexed _from, uint _now);

	function ping();
}

contract Pinger is Pingable {

	function ping () {
		last_ping = now;
		Ping(msg.sender, last_ping);
	}
}
