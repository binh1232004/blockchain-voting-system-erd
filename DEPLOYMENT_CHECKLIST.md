# Testnet Deployment Checklist

Use this checklist to track your testnet deployment progress:

## Preparation
- [ ] Create and configure `.env` file in the root directory
- [ ] Create and configure `.env.local` file in the frontend directory
- [ ] Get testnet ETH from a Sepolia faucet

## Deployment
- [ ] Deploy contracts to testnet: `npx hardhat run scripts/deploy.js --network sepolia`
- [ ] Verify contracts on Etherscan (optional)

## Configuration
- [ ] Confirm contract addresses in `frontend/app/contracts` were updated
- [ ] Update RPC provider URL in `frontend/.env.local` file

## Testing
- [ ] Launch frontend application: `cd frontend && npm run dev`
- [ ] Connect MetaMask to Sepolia network
- [ ] Test token claiming functionality
- [ ] Test voting functionality

## Troubleshooting
- [ ] Check MetaMask for sufficient ETH balance
- [ ] Verify contract addresses in the frontend
- [ ] Ensure your MetaMask account has permission to spend tokens

## Contract Addresses
- OERToken deployed at: __________________________
- OERVoting deployed at: __________________________

## Notes
_______________________________________________________
_______________________________________________________
_______________________________________________________
