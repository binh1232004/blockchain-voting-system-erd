# Testnet Deployment Guide

This guide explains how to deploy the blockchain voting system to the Sepolia testnet.

## Prerequisites

1. MetaMask wallet with a Sepolia account
2. Sepolia ETH for gas fees (from a faucet)
3. Alchemy or Infura API key for Sepolia RPC endpoint

## Step 1: Set Up Environment Variables

1. Create a `.env` file in the root directory of the project with the following variables:
   ```
   PRIVATE_KEY=your-wallet-private-key-here
   SEPOLIA_API_URL=https://eth-sepolia.g.alchemy.com/v2/your-api-key
   ETHERSCAN_API_KEY=your-etherscan-api-key-here
   ```

   - To get your private key from MetaMask:
     - Open MetaMask
     - Click on the three dots next to the account
     - Select "Account details"
     - Click "Export Private Key"
     - Enter your password and copy the private key
   
   - Get an API key from [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/)
   - Get an API key from [Etherscan](https://etherscan.io/apis)

2. Update the frontend environment file at `frontend/.env.local`:
   ```
   NEXT_PUBLIC_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your-api-key
   NEXT_PUBLIC_DATA_OER_URL=/api/oer/openTextBook
   ```

## Step 2: Get Sepolia Testnet ETH

1. Visit a Sepolia faucet:
   - [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
   - [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)
   - [PoW Faucet](https://sepolia-faucet.pk910.de/)

2. Follow the instructions to get testnet ETH sent to your wallet address

## Step 3: Deploy Contracts to Testnet

1. Run the deployment script:
   ```
   npx hardhat run scripts/deploy.js --network sepolia
   ```

2. The script will deploy the contracts and update the frontend configuration with the new contract addresses

## Step 4: Verify Contracts on Etherscan (Optional)

1. Verify the token contract:
   ```
   npx hardhat verify --network sepolia <TOKEN_CONTRACT_ADDRESS>
   ```

2. Verify the voting contract:
   ```
   npx hardhat verify --network sepolia <VOTING_CONTRACT_ADDRESS> <TOKEN_CONTRACT_ADDRESS>
   ```

## Step 5: Update Frontend Configuration

The deployment script automatically updates the frontend configuration files with the correct contract addresses in the `frontend/app/contracts` directory.

## Step 6: Test the Application

1. Start the Next.js development server:
   ```
   cd frontend
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`
3. Connect your MetaMask wallet (make sure it's set to the Sepolia network)
4. Test the voting functionality

## Troubleshooting

- If you encounter gas-related errors, ensure you have enough Sepolia ETH in your wallet
- If transactions are failing, check that your private key and API URLs are correctly set up
- For contract verification issues, ensure you're using the correct contract addresses and constructor arguments
