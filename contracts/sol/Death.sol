import "Delegatable.sol";
import "UnavailableAccountRecoverer.sol";

contract Death is Delegatable {

	address public UAR;


	function startUAR(address _recoveryDestination, 
					  address _timeReference,
					  uint _timeOut) {
		UnavailableAccountRecoverer u = new 
							UnavailableAccountRecoverer(_recoveryDestination,
		 												_timeReference,
		 												 _timeOut);
		UAR = u;
		addDelegate(UAR);

	}

	function changeOwner() onlyDelegate (msg.sender)  {

	}


}