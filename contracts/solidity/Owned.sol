
pragma solidity ^0.4.2;

import "Ownable.sol";
contract Owned is Ownable {

	function Owned() {
		owner = msg.sender;
	}
}
