'use client';

import { useState } from "react";
import useEthers from "./useEthers";
import useSWRCustom from "./useSWRCustom";
import { compareFnToGetDecreaseVote } from "../utils";

/**
 * 
 * @param {number} oerId 
 * @description this hook used to get vote of one oer based on id
 */
export default function useOERVote(oerId, oer){
    const {getReadOnlyVotingContract} = useEthers();
    const [oneOERVote, setOneOERVote] = useState(0);
    const [OERDecreasedOnVote, setOERDecreasedOnVote] = useState([]);
    /**
     * 
     * @param {number} oerId 
     * @returns {Promise<number>} vote for one oer
     */
    const setOneOERVoteFromEthereum = async () => {
        const votingContract = getReadOnlyVotingContract();
        const voteForOER = await votingContract.oerTotalVotes(oerId);
        setOneOERVote(Number(voteForOER));
    };

    const setDecreasedOERFromEthereum = async () => {
        if(!oer)
            return;
        // Deep Copy 
        const oerCopy = JSON.parse(JSON.stringify(oer.data));
        const length = oerCopy.length;
        // Insert vote property in oerCopy
        for(let i = 0 ; i < length; i++){
            const OERId = oerCopy[i].id;
            const votingContract = getReadOnlyVotingContract();
            const vote = await votingContract.oerTotalVotes(OERId);
            oerCopy[i].vote = Number(vote);
        }
        oerCopy.sort(compareFnToGetDecreaseVote);
        setOERDecreasedOnVote(oerCopy);
    };
    return {
        setOneOERVoteFromEthereum,
        oneOERVote,
        setDecreasedOERFromEthereum,
        OERDecreasedOnVote
    }
}