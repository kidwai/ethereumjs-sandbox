contract Delegatable {
	address owner;
	mapping (address => bool) delegates;

	function addDelegate (address _addr)
	onlyOwner {
		delegates[_addr] = true;
	}

	function removeDelegate (address _addr)
	onlyDelegate (_addr) {
		delegates[_addr] = false;
	}

	function changeOwner()
	onlyDelegate (msg.sender);


	modifier onlyOwner {
		if (msg.sender == owner) {
			_
		} else {
			throw;
		}
	} 
	modifier onlyDelegate (address _addr) {
		if (msg.sender == owner || delegates[_addr]) _
		else throw;	
	}
}


contract Death is Delegatable {

	function Death (address _delegate) {
		owner = msg.sender;
		addDelegate(_delegate);
	}


	function changeOwner() 
	onlyDelegate (msg.sender) {
		owner = msg.sender;
	}
}
