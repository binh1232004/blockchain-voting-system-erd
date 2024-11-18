'use client';
import {  useState } from 'react';
import useEthers from './useEthers';
import {ethers} from "ethers"
export default function useVoting(){
    
    const DECIMALS = 18;
    /**
     * State to store user's token information
     * @type {[{balance: number}, React.Dispatch<React.SetStateAction<TokenInfo>>]}
     */
    const [userToken, setUserToken] = useState({});
    const {
        initializeTokenContract,
        initializeVotingContract,
        parseEther
    } = useEthers();

    /**
     * 
     * @param {string} userAddress 
     */
    const updateCurrentToken = async (userAddress) => {
        const tokenContract = await initializeTokenContract(userAddress);
        const balance = await tokenContract.balanceOf(userAddress);
        const actualBalance = Number( balance );
        setUserToken({ balance: actualBalance })
        console.log(1);
    }
    /**
     * 
     * @param {string} userAddress 
     * @description claim for user with 10 tokens
     */
    const claimVotingTokens = async (userAddress) => {
        const tokenContract = await initializeTokenContract(userAddress);
        const tx = await tokenContract.claimVotingTokens();
        await tx.wait();
        await updateCurrentToken(userAddress);
    }

    /**
     * 
     * @param {number} oerId 
     * @param {number} tokenAmount 
     * @param {string} userAddress 
     */
    const voteTokens = async (oerId, tokenAmount, userAddress) => {
        try{
            const tokenContract = await initializeTokenContract(userAddress);
            const votingContract = await initializeVotingContract(userAddress);
            const votingContractAddress = await votingContract.getAddress(); 
            const approveForTransaction = await tokenContract.approve(votingContractAddress, tokenAmount);
            await approveForTransaction.wait();
            const voteForOER = await votingContract.voteToken(oerId, tokenAmount);
            await voteForOER.wait();
            await updateCurrentToken(userAddress);
        } catch (error){
            console.log("Error in voteTokens:", error);
            throw error;
        }
    }

    return {
        updateCurrentToken,
        setUserToken,
        userToken,
        claimVotingTokens,
        voteTokens
    };
}
