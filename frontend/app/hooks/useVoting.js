'use client';
import {  useState } from 'react';
import useEthers from './useEthers';
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
        const tokenContract = await initializeTokenContract();
        const balance = await tokenContract.balanceOf(userAddress);
        const actualBalance = Number( balance );
        setUserToken({ balance: actualBalance })
    }
    /**
     * 
     * @param {string} userAddress 
     * @description claim for user with 10 tokens
     */
    const claimVotingTokens = async (userAddress) => {
        const tokenContract = await initializeTokenContract();
        const tx = await tokenContract.claimVotingTokens();
        await tx.wait();
        await updateCurrentToken(userAddress);
    }

    /**
     * 
     * @param {int} oerId 
     * @param {int} tokenAmount 
     */
    const voteTokens = async (oerId, tokenAmount) => {
        const votingContract = await initializeVotingContract();
        const tx = await votingContract.voteToken(oerId, parseEther(tokenAmount.toString()));
        await tx.wait();
    }
    return {
        updateCurrentToken,
        setUserToken,
        userToken,
        claimVotingTokens,
        voteTokens
    };
}
