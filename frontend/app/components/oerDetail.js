'use client'
import useNotificationCustom from "../hooks/useNotificationCustom"
import Image from "next/image";
import useMetaMask from "../hooks/useMetaMask";
import { isValidUrl } from "../utils";
import { useEffect, useState } from "react";
import useToken from "../hooks/useToken";
import useVoting from "../hooks/useVoting";
import useOERVote from "../hooks/useOERVote";
export default function OerDetail({title, pdf, imgUrl, description, oerId }){
    // BUG: one time click it show two "1"
    // const [count ,setCount] = useState(0);
    // console.log(1);
    const {
        openNotificationWithIcon,
        contextHolder
    } = useNotificationCustom();
    
    const {
        userWalletAddress,
        connectSetUserWallet
    } = useMetaMask(openNotificationWithIcon);
    const  {
        inforToken,
        intializeGeneralInforToken
    } = useToken();

    const {
        updateCurrentToken,
        userToken,
        claimVotingTokens,
        voteTokens
    } = useVoting(openNotificationWithIcon);

    const { 
        setOneOERVoteFromEthereum, 
        oneOERVote 
    } = useOERVote(oerId);

    useEffect(() => {
        if(userWalletAddress)
            updateCurrentToken(userWalletAddress)
    }, [userWalletAddress]);
    useEffect(() => {
        setOneOERVoteFromEthereum();
    }, []);
    const handleConnectWalletButton = async () => {
        await connectSetUserWallet();
        await intializeGeneralInforToken();
    }
    const handleVoteButton = async () => {
        await voteTokens(oerId, 10, userWalletAddress);
        await setOneOERVoteFromEthereum();
    }
    const handleClaimVotingTokensButton = async () => {
        await claimVotingTokens(userWalletAddress);
    }
    const OER_COVER_DEFAULT  = '/oerTextBookCover.png';
    return (
        <div className="flex flex-row space-x-2 mt-5">
            {contextHolder} 
            <div className="w-1/2 bg-gray-700 h-[100px]">
                <Image
                        src={isValidUrl(imgUrl) ? imgUrl : OER_COVER_DEFAULT}     
                        width={100}
                        height={100}
                        alt="Image of open educational text book"
                />
            </div>
            <div className="w-1/2 bg-red-700 h-[100px]">
                <h1>{title + " " + oneOERVote }</h1>
{ 
    !userWalletAddress ? 
                ( <button className=" mt-2 p-1 bg-slate-300" onClick={handleConnectWalletButton}>Connect wallet</button> ) :
( 
<div>
                <button onClick={handleClaimVotingTokensButton} className="mt-2 p-1 bg-slate-300">Claim 10 voting tokens</button>
                <p>{userToken.balance?.toString() + " " + inforToken.symbol} </p>
                <button className=" ml-2 p-1 bg-slate-300" onClick={handleVoteButton}>Vote</button>
                
</div>
                
 )
}
                <p>{description}</p>
            </div>
        </div> 
    )
}
