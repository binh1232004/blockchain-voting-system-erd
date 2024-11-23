// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat");

module.exports = buildModule("FaucetModule", (m) => {
  const faucetContract = m.contract("Faucet", [], {
    value: ethers.parseEther("1000.0")
  });
  return {faucetContract};
})