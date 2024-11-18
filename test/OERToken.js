const { expect } = require("chai");
const { ethers } = require("hardhat")
describe("OER Token and OER Voting contract", function(){
    it("It should give the sender 10 tokens in OER Token", async function(){
        const [owner, user] = await ethers.getSigners();
        const oerToken = await ethers.deployContract("OERToken");

        await oerToken.connect(user).claimVotingTokens();
        const tokenClaimUser = 10;
        const tokenClaimOwner = 1000000;
        expect(await oerToken.balanceOf(user.address)).to.equal(tokenClaimUser);
        expect(await oerToken.balanceOf(owner.address)).to.equal(tokenClaimOwner);
    })
    it("Should give to user 10 tokens deploy by OER Token and using that tokens claimed to vote for oerid = 1 and tokens remain in user balance is 9", async function(){
        const [owner, user] = await ethers.getSigners();
        // Deploy contract
        const oerToken = await ethers.deployContract("OERToken");
        const tokenAddress = await oerToken.getAddress();
        const votingContract = await ethers.deployContract("OERVoting", [tokenAddress]);
        // claim 10 tokens for user
        await oerToken.connect(user).claimVotingTokens();
        // waiting for user for approve transfer to votingContract
        const OER_ID = 1; 
        const voteAmount = 1;
        await oerToken.connect(user).approve(
            await votingContract.getAddress(),
            voteAmount
        );
        // user vote for oerid 1 with amount 1
        await votingContract.connect(user).voteToken(OER_ID, voteAmount);
        const CLAIMED_VOTE = (1);
        const oerIdVote = await votingContract.oerTotalVotes( OER_ID );
        expect(oerIdVote).to.equal(CLAIMED_VOTE);
    })
})