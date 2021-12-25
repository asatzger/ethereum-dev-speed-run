//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MockERC20 is ERC20 {

    constructor(uint256 _totalSupply) ERC20("Coke", "COKE") {

        _mint(msg.sender, _totalSupply);

    }

}

contract Vendor is Ownable {

    MockERC20 public mockERC20;
    uint256 public constant tokensPerEth = 100;
    uint256 public constant tokensPerWei = tokensPerEth * 10 ** 18;

    constructor(address _mockERC20address) {
        mockERC20 = MockERC20(_mockERC20address);
    }


    function buyTokens() payable public {
        require(msg.value > 0, "Sent value needs to be non-zero.");
        require(mockERC20.balanceOf(address(this)) > msg.value / tokensPerWei, "Not enough tokens available at current price.");

        mockERC20.transfer(msg.sender, msg.value / tokensPerWei);
    }

    function withdraw() public onlyOwner {
        require(address(this).balance > 0, "Contract has balance of zero");
        bool sent = payable(msg.sender).send(address(this).balance);
        require(sent, "Failed to send ether");
    } 

    // @dev: should only be supplied via buyTokens() function; please do not simply send money
    receive() payable external {
        revert();
    }

    // @dev: get current price of tokens on sale, denominated in ETH
    function getPrice() public view returns(uint256) {
        return tokensPerEth;
    }
}