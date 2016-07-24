import "Ownable.sol";
import "Pingable.sol";

contract UnavailableAccountRecoverer is Ownable {
  address recoveryDestination;  //contract that will take over if the original account becomes unavailable
  address timeReference;  //contract that will tell us last time the account checked in
  uint timeout;  //how long to wait after a checkout before recovering account

  function UnavailableAccountRecoverer(address _recoveryDestination, address _timeReference, uint _timeout) {
    recoveryDestination = _recoveryDestination;
    timeReference = _timeReference;
    timeout = _timeout;
    super();
  }

  function setTimeReference(address _newTimeReference) onlyOwner() {
    timeReference = _newTimeReference;
  }

  function recover() {
    //first, check if time has actually expired (or if the timeReference wasn't properly configured)
    Pingable source = Pingable(timeReference);

    if(source.last_ping == 0 || now < source.last_ping + timeout) {
      throw;
    }
    //next, call changeOwner for the protected account
    Ownable protectedAccount = Ownable(owner);

    protectedAccount.changeOwner(recoveryDestination);
  }

}
