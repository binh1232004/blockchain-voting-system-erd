'use client';

import { useState } from "react";
import useEthers from "./useEthers";

/**
 * 
 * @param {number|undefined} oerId if undefined, only using AllOERVote
 * 
 */
export default function useOERVote(oerId){
    const  {
        initializeVotingContract
    } = useEthers();
    const [oneOERVote, setOneOERVote] = useState(0);
    /**
     * 
     * @param {number} oerId 
     * @returns {Promise<number>} vote for one oer
     */
    const setOneOERVoteFromEthereum = async () => {
        const votingContract = await  initializeVotingContract();
        const voteForOER = await votingContract.oerTotalVotes(oerId);
        setOneOERVote(Number(voteForOER));
    };

    return {
        setOneOERVoteFromEthereum,
        oneOERVote,
    }
}