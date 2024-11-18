import { ethers } from 'ethers';
import tokenAddress from "../contracts/tokenAddress.json";
import tokenArtifact from "../contracts/tokenArtifact.json";
import votingAddress from "../contracts/votingAddress.json";
import votingArtifact from "../contracts/votingArtifact.json";

export default function useEthers(){
    /**
     * 
     * @returns { Promise<Proxy> } contract of Token
     */
    const initializeTokenContract = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
            tokenAddress.Token,
            tokenArtifact.abi,
            signer
        );
        return contract;
    }

    /**
     * 
     * @returns { Promise<Proxy> } contract of Voting
     */
    const initializeVotingContract = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
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
