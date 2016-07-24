contract Ticker {
	uint public val;

	function Tick () { val += 1;}

	function reset() { val = 0;}
}