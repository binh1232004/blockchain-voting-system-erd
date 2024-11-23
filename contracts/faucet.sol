//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";
contract Faucet{
    uint256 public constant REQUESTED_ETHER = 0.1 ether;
    uint256 public constant REQUESTED_COOLDOWN = 1 days;
    uint256 public constant CONTRACT_INITIAL_SUPPLY = 1000 ether;

    mapping(address => uint256) public lastRequested;
    constructor() payable{
        require(msg.value == CONTRACT_INITIAL_SUPPLY, "Contract must be initialized with 1000 ethers");
    }
    function requestEth() public payable{
        require(
            block.timestamp >= lastRequested[msg.sender] + REQUESTED_COOLDOWN,
            "Wait for next request"
        );
        require(address(this).balance >= REQUESTED_ETHER, "Faucet is empty");

        (bool sent, bytes memory data) = payable(msg.sender).call{value: REQUESTED_ETHER}("");
        lastRequested[msg.sender] = block.timestamp;
        require(sent, "Failed to send Ether");

    }
    function balanceOf(address account) external view returns (uint256){
        return account.balance;
    }
}