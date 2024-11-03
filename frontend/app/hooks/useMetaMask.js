import { useState } from 'react';
import { ethers } from 'ethers';
import contractAddress from "../contracts/contract-address.json";
import tokenArtifact from "../contracts/Token.json";

/**
 * 
 * @todo Improve performance userWalletAddress and inforToken keep always updated
 */
export default function useMetaMask(openNotificationWithIcon){
    if(!openNotificationWithIcon)
        throw new Error('useMetaMask hook needs argument')
    const [userWalletAddress, setUserWalletAddress] = useState(undefined);
    
    /**
     * State to store token information
     * @type {[{name: string, symbol: string}, React.Dispatch<React.SetStateAction<TokenInfo>>]}
     */
    const [inforToken, setInforToken] = useState({});

    // Check if MetaMask is connected to the correct network (localhost/hardhat)
    // const switchNetwork = async () => {
    //     const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    //     const HARDHAT_CHAINID_HEX = "0x7a69";
    //     if (chainId !== HARDHAT_CHAINID_HEX) {
    //         await window.ethereum.request({
    //             method: 'wallet_switchEthereumChain',
    //             params: [{ chainId: HARDHAT_CHAINID_HEX }],
    //         });
    //     }
    // }

    /**
     * Assign information token's name and symbol to react state
     */
    const initializeEthers = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(
                contractAddress.Token,
                tokenArtifact.abi,
                signer
            );
            const symbol = await contract.symbol();
            const name = await contract.name();
            setInforToken({
                "symbol": symbol,
                "name": name
            });
        } catch (error) {
            console.error("Error initializing ethers:", error);
            let errorMessage = error.message;
            if (error.code === 'BAD_DATA') {
                errorMessage = 'Contract not deployed or wrong network. Please ensure contract is deployed on the current network.';
            }
        }
    }
    /**
     * 
     * @returns { Promise<string|void> }  Promise object represent address of user's wallet
     */
    const connectWallet = async () => {
        // if user do not have MetaMask, open notification for user know
        if(!window.ethereum){
           openNotificationWithIcon(typeNotification, messageNotification, descriptionNotification);
           return;
        }
        // request user to connect to their ethereum accounts by metamask
        const [selectedWallet] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return selectedWallet;
    }
    /**
     * 
     * @param {string} address Address of user's wallet
     */
    const initializeValue = async (address) => {
        setUserWalletAddress(address);
        await initializeEthers();
    }
    return {
        userWalletAddress,
        inforToken,
        connectWallet,
        initializeValue
    };
}