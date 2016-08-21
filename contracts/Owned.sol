import "Ownable.sol";
contract Owned is Ownable{

	function Owned() {
		owner = msg.sender;
	}
}