pragma solidity ^0.4.2;

contract Ownable {
	address owner;

	modifier onlyOwner {
		if (msg.sender == owner) {
			_;
		} else {
			throw;
		}
	}
}
