const VotingModule = require('../ignition/modules/OERVoting');
const hre = require('hardhat');
const fs = require('fs');
const path = require('path');
async function main() {
    const { votingContract, tokenContract } = await hre.ignition.deploy(VotingModule);
    const votingAddress = await votingContract.getAddress();
    const tokenAddress = await tokenContract.getAddress();
    saveFrontendFiles(votingAddress, "votingAddress","votingArtifact", "OERVoting");
    saveFrontendFiles(tokenAddress, "tokenAddress","tokenArtifact", "OERToken");
}

function saveFrontendFiles(tokenAddress, fileAddressName, fileAbiName, contractName) {
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
        path.join(contractsDir, fileAddressName + ".json"),
        JSON.stringify({ Token: tokenAddress }, undefined, 2),
    );

    const TokenArtifact = artifacts.readArtifactSync(contractName);

    fs.writeFileSync(
        path.join(contractsDir, fileAbiName + ".json"),
        JSON.stringify(TokenArtifact, null, 2),
    );
}

main().catch(console.error);
