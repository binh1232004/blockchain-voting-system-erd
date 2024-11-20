'use client';
import {  useState } from 'react';
import useEthers from './useEthers';
import {ethers} from "ethers"
/**
 * 
 * @description this hook used to do thing involve with vote 
 */
export default function useVoting(openNotificationWithIcon){
    const ERROR_MESSAGE_TIME = "Waiting for next claim";
    const ERROR_MESSAGE_MAX_USER_TOKEN = "Max tokens per user reached";
    const ERROR_MESSAGE_MAX_TOKEN = "Max tokens reached";
    const DECIMALS = 18;
    /**
     * State to store user's token information
     * @type {[{balance: number}, React.Dispatch<React.SetStateAction<TokenInfo>>]}
     */
    const [userToken, setUserToken] = useState({});
    const {
        initializeTokenContract,
        initializeVotingContract,
        parseEther,
        transformWeiToEther
    } = useEthers();

    /**
     * 
     * @param {string} userAddress 
     */
    const updateCurrentToken = async (userAddress) => {
        const tokenContract = await initializeTokenContract(userAddress);
        const balance = await tokenContract.balanceOf(userAddress);
        const actualBalance = transformWeiToEther( balance );
        setUserToken({ balance: actualBalance })
        console.log(1);
    }
    /**
     * 
     * @param {string} userAddress 
     * @description claim for user with 10 tokens
     */
    const claimVotingTokens = async (userAddress) => {
        try{ 
            const tokenContract = await initializeTokenContract(userAddress);
            const tx = await tokenContract.claimVotingTokens();
            await tx.wait();
            await updateCurrentToken(userAddress);
        }catch(error){
            const errorMessage = error.message;
            if(errorMessage.includes(ERROR_MESSAGE_TIME))
                openNotificationWithIcon("error", "ERROR", ERROR_MESSAGE_TIME, 2);
            else if(errorMessage.includes(ERROR_MESSAGE_MAX_USER_TOKEN))
                openNotificationWithIcon("error", "ERROR", ERROR_MESSAGE_MAX_USER_TOKEN, 2);
            else if(errorMessage.includes(ERROR_MESSAGE_MAX_TOKEN))
                openNotificationWithIcon("error", "ERROR", ERROR_MESSAGE_MAX_TOKEN, 2);
            else{
                openNotificationWithIcon("error", "ERROR", "An unknown error", 2);

            }


        }
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
