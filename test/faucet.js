const { expect } = require("chai");
const { ethers } = require("hardhat")
describe("Faucet contract", function(){
    it("It should give the sender 0.1 ETH in user's balance", async function(){
        const [owner, user] = await ethers.getSigners();
        // deploy and give to Faucet contract 1000000000 ETH
        const INITIAL_SUPPLY = "1000.0";
        const faucetContract = await ethers.deployContract("Faucet", {value : ethers.parseEther(INITIAL_SUPPLY)});

        const balanceBefore = await ethers.provider.getBalance(user.address);
        //request for getting 0.1 into user account
        await faucetContract.connect(user).requestEth();
        const balanceAfter = await ethers.provider.getBalance(user.address);
        //test
        expect(balanceAfter - balanceBefore).to.closeTo(ethers.parseEther("0.1"), ethers.parseEther("0.01"));
    })
})