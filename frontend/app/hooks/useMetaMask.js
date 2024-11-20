import { useEffect, useState } from 'react';
import useVoting from './useVoting';
/**
 * 
 * @description this hook used to do thing involve in metamask
 */
export default function useMetaMask(openNotificationWithIcon){
    if(!openNotificationWithIcon)
        throw new Error('useMetaMask hook needs argument')
    const [userWalletAddress, setUserWalletAddress] = useState(undefined);
    const {updateCurrentToken}  = useVoting();
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
    /**
     * @description handle account changed
     */
    useEffect(() => {
        const handleAccountsChanged = (accounts) => {
            openNotificationWithIcon("info", "Changed account", "You've successfully changed account", 2)
            setUserWalletAddress(accounts[0]);
            updateCurrentToken(accounts[0]);
        }
        window.ethereum.on("accountsChanged", handleAccountsChanged);
        return () => {
            if(window.ethereum)
                window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
    }, [])
    return {
        userWalletAddress,
        setUserWalletAddress,
        connectSetUserWallet
    };
}
