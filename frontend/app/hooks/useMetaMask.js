import { useState } from 'react';

/**
 * 
 * @todo Improve performance userWalletAddress and inforToken keep always updated
 */
export default function useMetaMask(openNotificationWithIcon){
    if(!openNotificationWithIcon)
        throw new Error('useMetaMask hook needs argument')
    const [userWalletAddress, setUserWalletAddress] = useState(undefined);
    
    const [typeNotification, messageNotification, descriptionNotification] = [
        'error', 
        'Sorry, no Ethereum wallet was detected.', 
        "Please install MetaMask"
    ];
    /**
     * 
     * @returns { Promise<string|void> }  Promise object represent address of user's wallet
     */
    const connectSetUserWallet = async () => {
        // if user do not have MetaMask, open notification for user know
        if(!window.ethereum){
           openNotificationWithIcon(typeNotification, messageNotification, descriptionNotification);
           return;
        }
        // request user to connect to their ethereum accounts by metamask
        const [selectedWallet] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setUserWalletAddress(selectedWallet);
    }
    return {
        userWalletAddress,
        setUserWalletAddress,
        connectSetUserWallet
    };
}
