"use client";
import useNotificationCustom from "../hooks/useNotificationCustom";
import Image from "next/image";
import useMetaMask from "../hooks/useMetaMask";
import { isValidUrl } from "../utils";
import { useEffect, useState } from "react";
import useToken from "../hooks/useToken";
import useVoting from "../hooks/useVoting";
import useOERVote from "../hooks/useOERVote";
import useFaucet from "../hooks/useFaucet";
export default function OerDetail({
    title,
    imgUrl,
    description,
    oerId,
    author,
}) {
    const { openNotificationWithIcon, contextHolder } = useNotificationCustom();
    const [visibleBackgroundAuthor, setVisibleBackgroundAuthor] =
        useState(null);
    const [isVisibleDescriptionOER, setIsVisibleDescriptionOER] =
        useState(false);
    const { userWalletAddress, connectSetUserWallet } = useMetaMask(
        openNotificationWithIcon
    );
    const { inforToken, intializeGeneralInforToken } = useToken();

    const { updateCurrentToken, userToken, claimVotingTokens, voteTokens } =
        useVoting(openNotificationWithIcon);

    const { setOneOERVoteFromEthereum, oneOERVote } = useOERVote(oerId);

    useEffect(() => {
        if (userWalletAddress) updateCurrentToken(userWalletAddress);
    }, [userWalletAddress]);
    useEffect(() => {
        setOneOERVoteFromEthereum();
    }, []);
    const handleHoverAuthor = (index, isHovering) => {
        setVisibleBackgroundAuthor(isHovering ? index : null);
    };
    const handleButtonVisibleDescriptionOER = () => {
        setIsVisibleDescriptionOER(!isVisibleDescriptionOER);
    };
    const handleConnectWalletButton = async () => {
        await connectSetUserWallet();
        await intializeGeneralInforToken();
    };
    const handleVoteButton = async () => {
        await voteTokens(oerId, 1, userWalletAddress);
        await setOneOERVoteFromEthereum();
    };
    const handleClaimVotingTokensButton = async () => {
        await claimVotingTokens(userWalletAddress);
    };
    console.log(author);
    const OER_COVER_DEFAULT = "/oerTextBookCover.png";
    return (
        <div className="flex flex-col m-6 md:flex-row">
            {contextHolder}
            <div className="p-5 border-detail-oer justify-center  h-80 mb-6 md:w-1/5  md:mr-6  rounded flex ">
                <Image
                    src={isValidUrl(imgUrl) ? imgUrl : OER_COVER_DEFAULT}
                    width={200}
                    height={100}
                    alt="Image of open educational text book"
                />
            </div>
            <div
                className={`${
                    isVisibleDescriptionOER ? "" : "h-80"
                }  p-5 flex-col    md:w-4/5 bg-block rounded flex `}
            >
                <h1 className="font-bold text-lg md:text-xl">
                    {title + " " + oneOERVote + " OERT"}
                </h1>
                <h2 className="text-base md:text-lg">
                    By{" "}
                    {author.map((item, index) => (
                        <button
                            className="relative "
                            onMouseOver={() => handleHoverAuthor(index, true)}
                            onMouseOut={() => handleHoverAuthor(index, false)}
                        >
                            {item.fullName}
                            <p
                                className={`absolute text-xs md:text-sm bg-blue-200 p-2  rounded text-left  left-full w-96 z-10 ${
                                    visibleBackgroundAuthor === index
                                        ? ""
                                        : "hidden"
                                }`}
                            >
                                {item.background}
                            </p>
                        </button>
                    ))}
                </h2>
                {!userWalletAddress ? (
                    <button
                        className=" mt-2 p-1 bg-slate-300"
                        onClick={handleConnectWalletButton}
                    >
                        Connect wallet
                    </button>
                ) : (
                    <div>
                        <button
                            onClick={handleClaimVotingTokensButton}
                            className="mt-2 p-1 bg-slate-300"
                        >
                            Claim 10 voting tokens
                        </button>
                        <p>
                            {userToken.balance?.toString() +
                                " " +
                                inforToken.symbol}{" "}
                        </p>
                        <button
                            className=" ml-2 p-1 bg-slate-300"
                            onClick={handleVoteButton}
                        >
                            Vote
                        </button>
                    </div>
                )}
                <p className="w-full h-[1px] bg-line text-xs my-3 text-transparent">
                    -
                </p>
                <div
                    className={`${
                        isVisibleDescriptionOER ? "" : "overflow-hidden"
                    } relative text-left`}
                >
                    <p className="text-sm md:text-base">{description}</p>
                    {isVisibleDescriptionOER ? (
                        <div></div>
                    ) : (
                        <div className="absolute top-0 bottom-0 w-full h-full gradient-description"></div>
                    )}
                </div>
                <button
                    className="flex justify-center text-base text-blue-500 md:text-lg"
                    onClick={() => handleButtonVisibleDescriptionOER()}
                >
                    {isVisibleDescriptionOER ? "Read less" : "Read more"}
                </button>
            </div>
        </div>
    );
}
