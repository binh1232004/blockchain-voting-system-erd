'use client'
import useNotificationCustom from "../hooks/useNotificationCustom"
import Image from "next/image";
import useMetaMask from "../hooks/useMetaMask";
import { isValidUrl } from "../utils";
import { useEffect } from "react";
export default function OerDetail({title, pdf, imgUrl, description}){
    const {
        openNotificationWithIcon,
        contextHolder
    } = useNotificationCustom();
    const [typeNotification, messageNotification, descriptionNotification] = [
        'error', 
        'Sorry, no Ethereum wallet was detected.', 
        "Please install MetaMask"
    ];
    const {
        //value
        userWalletAddress,
        inforToken,
        userToken,
        //function
        connectWallet,
        initializeValue,
        updateBalance
    } = useMetaMask(openNotificationWithIcon);

    
    const onClickHandle = async () => {
        const userPurseAddress = await connectWallet();
        if(!userPurseAddress)
            return;
        await initializeValue(userPurseAddress);
        // console.log(userWalletAddress, inforToken);
        await updateBalance();
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
                <h1>{title}</h1>
                <button className=" mt-2 p-1 bg-slate-300" onClick={onClickHandle}>vote</button>
                <p>{description}</p>
            </div>
        </div> 
    )
}