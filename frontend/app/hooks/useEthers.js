import { ethers } from 'ethers';
import tokenAddress from "../contracts/tokenAddress.json";
import tokenArtifact from "../contracts/tokenArtifact.json";
import votingAddress from "../contracts/votingAddress.json";
import votingArtifact from "../contracts/votingArtifact.json";

export default function useEthers(){
    /**
     * 
     * @param {string|undefined} userWalletAddress 
     * @returns {Promise<>} signer of userWallet or default wallet
     */
    const getSignerWithUserWalletAddress = async (userWalletAddress) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(userWalletAddress || 0);
        return signer; 
    }
    /**
     * @param {string|undefined} userWalletAddress
     * @returns { Promise<Proxy> } contract of Token
     */
    const initializeTokenContract = async (userWalletAddress) => {
        const signer = await getSignerWithUserWalletAddress(userWalletAddress)
        const contract = new ethers.Contract(
            tokenAddress.Token,
            tokenArtifact.abi,
            signer
        );
        return contract;
    }

    /**
     * @param {string|undefined} userWalletAddress
     * @returns { Promise<Proxy> } contract of Voting
     */
    const initializeVotingContract = async (userWalletAddress) => {
        const signer = await getSignerWithUserWalletAddress(userWalletAddress);
        const contract = new ethers.Contract(
            votingAddress.Token,
            votingArtifact.abi,
            signer
        );
        return contract;

    }
    const parseEther = (tokenAmount) => {
        return ethers.parseEther(tokenAmount);
    }
    return {
        initializeTokenContract,
        initializeVotingContract,
        parseEther
    };
}
