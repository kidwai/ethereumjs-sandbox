contract Token {
	uint initial_supply;
	mapping (address => uint) balances;
	
	function Token(uint _initial_supply) {
		initial_supply = _initial_supply;
		balances[msg.sender] = _initial_supply;
	}

	function transfer(address _to, uint _value) {
		if (balances[msg.sender] >= _value) {
			balances[msg.sender] -= _value;
			balances[_to] += _value;
		}
	}

	function balanceOf(address _owner) constant returns (uint balance) {
		return balances[_owner];
	}
}
