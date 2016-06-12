contract  token {
	mapping (address => uint256) public balanceOf;
	
	function token (uint initial_supply) {
		balanceOf[msg.sender] = initial_supply;
	}

	function transfer(address _receiver, uint256 _value) {
		if (balanceOf[msg.sender] < _value) throw;
		if (balanceOf[_receiver] + _value < balanceOf[_receiver]) throw;
		balanceOf[msg.sender] -= _value;
		balanceOf[_receiver] += _value;
	}
}