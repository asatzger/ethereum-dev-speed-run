//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ExampleExternalContract.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";



contract Staking {

    ExampleExternalContract public exampleExternalContract;

    constructor(address exampleExternalContractAddress) {
        exampleExternalContract = ExampleExternalContract(exampleExternalContractAddress);
    }

    mapping ( address => uint256 ) public balances;
    uint256 public constant threshold = 1 ether;
    uint256 public deadline = block.timestamp + 30 seconds;
    bool openForWithdraw = false;

    event Staked(address indexed staker, uint256 amount);
    event Executed();

    // Add function to sender balance
    function stake() payable public {
        balances[msg.sender] += msg.value;

        emit Staked(msg.sender, msg.value);
    }

    /*
    Call external contract's complete function if both criteria are fulfilled:
    1. deadline has passed; 2. contract balance meets defined threshold
    */
    function execute() public {
        require(block.timestamp > deadline);
        require(address(this).balance > threshold);

        if (address(this).balance > threshold) {
            exampleExternalContract.complete{value: address(this).balance}();
            emit Executed();
        }
        else {
            openForWithdraw = true;
        }
    }

    // allows to withdraw one's own funds of threshold has yet to be met
    function withdraw(address payable _to) external {
        require(openForWithdraw == true, "Threshold has been met.");
        require(balances[msg.sender] > 0, "Sender's balance is 0.");

        bool sent = _to.send(balances[msg.sender]);
        require(sent, "Failed to send ether");
    }

    // Calculates the remaining time until deadline passes
    function timeLeft() public view returns(uint256 ) {
        return Math.max(0, block.timestamp - deadline);
    }

    // Handles all calls with msg.value != 0 where stake() is not invoked directly
    receive() payable external {
        stake();
    }
}
