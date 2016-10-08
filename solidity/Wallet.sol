import "Owned.sol";
import "Token.sol";

contract Wallet is Owned() {
	address token_addr;

	function Wallet (address _token_addr) {
		token_addr = _token_addr;
	} 

	function balance () constant returns (uint) {
		return Token(token_addr).balanceOf(owner);
	}

	function transfer (address _to, uint _value) 
	onlyOwner {
		Token(token_addr).transfer(_to, _value);
	}
}