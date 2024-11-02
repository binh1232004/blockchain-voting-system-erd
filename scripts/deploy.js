const TokenModule = require("../ignition/modules/Token");
const hre = require("hardhat")
const fs = require("fs");
const path = require("path");
async function main() {
    const { tokenContract } = await hre.ignition.deploy(TokenModule);
    const tokenAddress = await tokenContract.getAddress();
    saveFrontendFiles(tokenAddress);
}

function saveFrontendFiles(tokenAddress) {
    const contractsDir = path.join(__dirname, "../", "frontend", "app", "contracts");

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        path.join(contractsDir, "contract-address.json"),
        JSON.stringify({ Token: tokenAddress }, undefined, 2)
    );

    const TokenArtifact = artifacts.readArtifactSync("Token");

    fs.writeFileSync(
        path.join(contractsDir, "Token.json"),
        JSON.stringify(TokenArtifact, null, 2)
    );
}



main().catch(console.error);