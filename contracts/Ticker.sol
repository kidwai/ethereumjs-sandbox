contract Ticker {
	uint public val;
	
	function Ticker() {
		val = 0;
	}

	function tick() {
		val += 1;
	}

}
