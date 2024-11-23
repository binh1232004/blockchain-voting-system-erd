const VotingModule = require('../ignition/modules/OERVoting');
const FaucetModule = require('../ignition/modules/faucet');
const hre = require('hardhat');
const fs = require('fs');
const path = require('path');
async function main() {
    const { votingContract, tokenContract } = await hre.ignition.deploy(VotingModule);
    const { faucetContract } = await hre.ignition.deploy(FaucetModule);
    const votingAddress = await votingContract.getAddress();
    const tokenAddress = await tokenContract.getAddress();
    const faucetAddress = await faucetContract.getAddress();
    saveFrontendFiles(votingAddress, "votingAddress","votingArtifact", "OERVoting");
    saveFrontendFiles(tokenAddress, "tokenAddress","tokenArtifact", "OERToken");
    saveFrontendFiles(faucetAddress, "faucetAddress","faucetArtifact", "Faucet");
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
