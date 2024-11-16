const TokenModule = require('../ignition/modules/OERToken');
const hre = require('hardhat');
const fs = require('fs');
const path = require('path');
async function main() {
    const { tokenContract } = await hre.ignition.deploy(TokenModule);
    const tokenAddress = await tokenContract.getAddress();
    saveFrontendFiles(tokenAddress);
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
        path.join(contractsDir, 'contractTokenAddress.json'),
        JSON.stringify({ Token: tokenAddress }, undefined, 2),
    );

    const TokenArtifact = artifacts.readArtifactSync('OERToken');

    fs.writeFileSync(
        path.join(contractsDir, 'token.json'),
        JSON.stringify(TokenArtifact, null, 2),
    );
}

main().catch(console.error);
