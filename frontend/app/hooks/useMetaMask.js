import { useRef, useState } from 'react';
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
     * State to store general token information
     * @type {[{name: string, symbol: string, deployedContract: Proxy }, React.Dispatch<React.SetStateAction<TokenInfo>>]}
     */
    const [inforToken, setInforToken] = useState({});
    /**
     * State to store user's token information
     * @type {[{balance: number}, React.Dispatch<React.SetStateAction<TokenInfo>>]}
     */
    const [userToken, setUserToken] = useState({});

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
     * 
     * @returns {Proxy} a contract proxy of etherjs
     */
    const getContract = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
            contractAddress.Token,
            tokenArtifact.abi,
            signer
        );
        return contract;
    }
    /**
     * update state inforToken token's name, symbol and deployedContract 
     */
    const initializeEthers = async () => {
        try {
            const contract = await getContract();
            const symbol = await contract.symbol();
            const name = await contract.name();
            setInforToken({
                "symbol": symbol,
                "name": name,
                "deployedContract": contract
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
     * @param {Proxy} contract 
     * @param {string} userPurseAddress 
     */
    const updateBalance = async () => {
        const contract = await getContract();
        const userPurseAddress = await connectWallet();
        const balance = await contract.balanceOf(userPurseAddress);
        setUserToken({ balance: balance })
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
     * @description update state for userWalletAddres, inforToken
     */
    const initializeValue = async (address) => {
        setUserWalletAddress(address);
        await initializeEthers();
        // Wait for next render when state is updated
        updateBalance(address);
     }
    return {
        //value
        userWalletAddress,
        inforToken,
        userToken,
        //function
        connectWallet,
        initializeValue,
        updateBalance
    };
}
