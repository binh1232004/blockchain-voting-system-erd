import { ethers } from 'ethers';
import tokenAddress from "../contracts/tokenAddress.json";
import tokenArtifact from "../contracts/tokenArtifact.json";
import votingAddress from "../contracts/votingAddress.json";
import votingArtifact from "../contracts/votingArtifact.json";
import faucetAddress from "../contracts/faucetAddress.json";
import faucetArtifact from "../contracts/faucetArtifact.json";

/**
 * 
 * @description this hooks used to initialize contract 
 */
export default function useEthers(){
    /**
     * 
     * @returns RPC provider
     */
    const getFallbackProvider = () => {
        const RPC_ENDPOINT = process.env.NEXT_PUBLIC_RPC_URL;
        return new ethers.JsonRpcProvider(RPC_ENDPOINT);
    }
    /**
     * 
     * @returns if having MetaMask return provider MetaMask, else RPC provider
     */
    const getProvider = () => {
        if(window.ethereum){
            return new ethers.BrowserProvider(window.ethereum);
        }
        return getFallbackProvider();
    }
    /**
     * 
     * @param {string|undefined} userWalletAddress 
     * @returns {Promise<>} signer of userWallet or default wallet
     */
    const getSigner = async (userWalletAddress) => {
        const provider = getProvider();
        const signer = await provider.getSigner(userWalletAddress || 0);
        return signer; 
    }
    /**
     * 
     * @returns {Proxy} only can read from token contract
     */
    const getReadOnlyTokenContract = () => {
        const provider = getProvider();
        const contract = new ethers.Contract(
            tokenAddress.Token,
            tokenArtifact.abi,
            provider
        );
        return contract;
    }
    /**
     * 
     * @returns {Proxy} only can read from voting contract
     */
    const getReadOnlyVotingContract = () => {
        const provider = getProvider();
        const contract = new ethers.Contract(
            votingAddress.Token,
            votingArtifact.abi,
            provider
        );
        return contract;
    }
    /**
     * @param {string|undefined} userWalletAddress
     * @returns { Promise<Proxy> } can write, change state to Token contract
     */
    const getSignedTokenContract = async (userWalletAddress) => {
        const signer = await getSigner(userWalletAddress)
        const contract = new ethers.Contract(
            tokenAddress.Token,
            tokenArtifact.abi,
            signer
        );
        return contract;
    }

    /**
     * @param {string|undefined} userWalletAddress
     * @returns { Promise<Proxy> } can write, change state to voting contract
     */
    const getSignedVotingContract = async (userWalletAddress) => {
        const signer = await getSigner(userWalletAddress);
        const contract = new ethers.Contract(
            votingAddress.Token,
            votingArtifact.abi,
            signer
        );
        return contract;
    }
    const getSignedFaucetContract = async (userWalletAddress) => {
        const signer = await getSigner(userWalletAddress);
        const contract = new ethers.Contract(
            faucetAddress.Token,
            faucetArtifact.abi,
            signer
        );
        return contract;
    }
    /**
     * 
     * @param {string} tokenAmount  decimal string
     * @returns {BigInt}
     */
    const transformEtherToWei = (tokenAmount) => {
        return ethers.parseEther(tokenAmount, 18);
    }
    /**
     * 
     * @param {BigInt} tokenAmount 
     * @returns {string} decimal string
     */
    const transformWeiToEther = (tokenAmount) => {
        return ethers.formatUnits(tokenAmount, 18);
    }
    return {
        getSignedTokenContract,
        getReadOnlyTokenContract,
        getSignedVotingContract,
        getReadOnlyVotingContract,
        transformEtherToWei,
        transformWeiToEther,
        getSignedFaucetContract
    };
}
