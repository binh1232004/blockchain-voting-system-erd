const VotingModule = require('../ignition/modules/OERVoting');
const hre = require('hardhat');
const fs = require('fs');
const path = require('path');
async function main() {
    const { votingContract } = await hre.ignition.deploy(VotingModule);
    const votingAddress = await votingContract.getAddress();
    saveFrontendFiles(votingAddress);
}

function saveFrontendFiles(tokenAddress) {
    const contractsDir = path.join(
        __dirname,
        '../',
        'frontend',
        'app',
        'contracts',
    );

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        path.join(contractsDir, 'contractVotingAddress.json'),
        JSON.stringify({ Token: tokenAddress }, undefined, 2),
    );

    const TokenArtifact = artifacts.readArtifactSync('OERVoting');

    fs.writeFileSync(
        path.join(contractsDir, 'voting.json'),
        JSON.stringify(TokenArtifact, null, 2),
    );
}

main().catch(console.error);
