# Blockchain Voting System - Testnet Deployment

This repository contains a blockchain-based voting system for open educational resources (OER). This guide focuses on deploying the application to the Sepolia testnet.

## Project Structure

- `contracts/` - Solidity smart contracts
  - `OERToken.sol` - ERC20 token contract for voting
  - `OERVoting.sol` - Voting contract that interacts with the token
  - `faucet.sol` - Faucet contract for local development

- `frontend/` - Next.js web application
  - Uses ethers.js to interact with the blockchain

## Deployment Steps

Follow these steps to deploy the application to the Sepolia testnet:

### 1. Set Up Environment

1. Install project dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env` file in the root directory with:

```
PRIVATE_KEY=your-ethereum-wallet-private-key
SEPOLIA_API_URL=https://eth-sepolia.g.alchemy.com/v2/your-api-key
ETHERSCAN_API_KEY=your-etherscan-api-key
```

3. Update frontend environment:

Edit `frontend/.env.local` with:

```
NEXT_PUBLIC_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your-api-key
NEXT_PUBLIC_DATA_OER_URL=/api/oer/openTextBook
```

### 2. Get Testnet ETH

Obtain Sepolia ETH from one of these faucets:

- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)
- [PoW Faucet](https://sepolia-faucet.pk910.de/)

### 3. Deploy Contracts

Deploy the contracts to Sepolia:

```bash
npm run deploy:sepolia
```

This will:
- Deploy the OERToken contract
- Deploy the OERVoting contract
- Update the frontend configuration with contract addresses
- Log the addresses for verification

### 4. Verify Contracts (Optional)

Verify your contracts on Etherscan for transparency:

```bash
npx hardhat verify --network sepolia <TOKEN_CONTRACT_ADDRESS>
npx hardhat verify --network sepolia <VOTING_CONTRACT_ADDRESS> <TOKEN_CONTRACT_ADDRESS>
```

### 5. Start the Frontend

Start the frontend application:

```bash
npm run start:frontend
```

Access the application at http://localhost:3000

### 6. Testing

1. Connect your MetaMask wallet to the application
2. Switch to Sepolia network in MetaMask
3. Claim voting tokens
4. Vote for your favorite OER resources

## Smart Contract Details

- **OERToken**: ERC20 token with a fixed supply for voting
  - Users can claim tokens periodically
  - Maximum tokens per user is limited

- **OERVoting**: Contract that allows users to vote for OER resources
  - Uses the OERToken for voting
  - Tracks votes by OER ID

## Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethers.js Documentation](https://docs.ethers.org/v6/)
- [Sepolia Testnet Explorer](https://sepolia.etherscan.io/)

## Detailed Documentation

For more detailed information, see:

- [Testnet Deployment Guide](./TESTNET_DEPLOYMENT.md)
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)
