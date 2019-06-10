pragma solidity >=0.4.25 <0.6.0;

//Contract is just like classes
contract Twibber {

    //Declaring an event
    event MessageCreated (address user, string message);

    //Constructor
    function () external {}

    // counts number of message sent from each account
    mapping (address => uint) msgCounter;

    //it is creating an event Message with text and user.
    function sendMessage (string memory text) public returns (bool) {
        //require() is throwing error, if the input is not true
        //require(userExists(msg.sender));
        msgCounter[msg.sender]++;
        emit MessageCreated(msg.sender, text);
        return true;
    }

    // We are using view keyword, to specify that it is not modified the state of contract. It will consume less resources.
    function getMsgCount() public view returns (uint) {
        return msgCounter[msg.sender];
    }
}