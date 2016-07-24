contract Forwarder is Pingable, Wallet {

	address succcessor;

	function Forwarder(address _tokenAddr, 
					   address _beneficiary,
					   address _successor,
					   uint _expiry) {

		owner = address(this);
		beneficiary = _beneficiary;
		successor = _successor
		expiry = _expiry;
		last_ping = now;
		token = Token(_tokenAddr);
	}




	function ping () onlyOwner {
		last_ping = now;
	}

	function die () 
	hasExpired
	onlyExecutor {
		event Death (address indexed owner, address indexed executor)
		owner = executor;
		delete executor;
	}



	modifier onlyOwner {
		if (msg.sender == owner) {
			_
		} else {
			throw;
		}
	}
	modifier onlySuccessor {
		if (msg.sender == successor) {
			_
		} else {
			throw;
		}
	}
	modifier hasExpired {
		if (last_ping + expiry < now) _
		else throw;
	}
	function () {
		throw;	
	}
}