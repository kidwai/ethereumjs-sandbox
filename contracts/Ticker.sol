contract Ticker {
	uint public val;
	event Tick(address indexed sender, uint indexed tick_val);
	
	function Ticker() {
		val = 0;
	}

	function tick() {
		val += 1;
		Tick(msg.sender, val);
	}
}


