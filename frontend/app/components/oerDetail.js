'use client'
import Link from "next/link"
import useNotificationCustom from "../hooks/useNotificationCustom"
import { useEffect, useState } from "react";
import { ethers, Contract } from "ethers";
import Image from "next/image";
import contractAddress from "../contracts/contract-address.json";
import tokenArtifact from "../contracts/Token.json";
export default function OerDetail({title, pdf, imgUrl, description}){
    const {
        openNotificationWithIcon,
        contextHolder
    } = useNotificationCustom();
    const [selectedAddress, setSelectedAddress] = useState(undefined);
    const [typeNotification, messageNotification, descriptionNotification] = ['error', 'Sorry, no Ethereum wallet was detected.', "Please install MetaMask"]
    const initializeEthers = async () => {
        try {
            // Check if MetaMask is connected to the correct network (localhost/hardhat)
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            if (chainId !== '0x7A69') { // Hardhat's chainId in hex
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x7A69' }],
                });
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            
            // Debug logs
            console.log("Contract address:", contractAddress["TokenModule#Token"]);
            console.log("Contract ABI:", tokenArtifact.abi);
            
            const contract = new ethers.Contract(
                contractAddress["TokenModule#Token"],
                tokenArtifact.abi,
                signer
            );

            // Wait for contract to be ready
            await contract.getDeployedCode();
            
            const symbol = await contract.symbol();
            console.log("Token symbol:", symbol);
            
        } catch (error) {
            console.error("Error initializing ethers:", error);
            let errorMessage = error.message;
            
            if (error.code === 'BAD_DATA') {
                errorMessage = 'Contract not deployed or wrong network. Please ensure contract is deployed on the current network.';
            }
            
            openNotificationWithIcon('error', 'Contract Error', errorMessage);
        }
    }
    const onClickHandle = async () => {
        if(!window.ethereum){
           openNotificationWithIcon(typeNotification, messageNotification, descriptionNotification);
           return;
        }
        // request user to connect to their ethereum accounts by metamask
        // const [selectedWallet] = await window.ethereum.request({method: 'eth_requestAccounts'});
        initializeEthers();
        
    }
    onClickHandle();
    const initialize = (userAddress) => {
        setSelectedAddress(userAddress);
        
    }
    
    return (
        <div className="flex flex-row space-x-2 mt-5">
            {contextHolder} 
            <div className="w-1/2 bg-gray-700 h-[100px]">
            <Image
                    src={imgUrl}     
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