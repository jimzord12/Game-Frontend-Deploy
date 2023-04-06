import { useState, useEffect, createContext } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
// import { useNavigate } from 'react-router-dom';
import { GetParams } from '../utils/Onboard.js';

const Web3Context = createContext();

export const Web3ContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState(null);
  const [step, setStep] = useState(1);

  // const navigate = useNavigate();

  //* Reset web3 onboarding modal params
  useEffect(() => {
    // Maybe a better name for this one is: `reFetchParams`
    const resetParams = async () => {
      const currentStep = await GetParams();

      setStep(currentStep.step);
    };

    resetParams();

    window?.ethereum?.on('chainChanged', () => resetParams());
    window?.ethereum?.on('accountsChanged', () => resetParams());
  }, []);

  useEffect(() => {
    updateCurrentWalletAddress();

    window?.ethereum?.on('accountsChanged', updateCurrentWalletAddress);
  }, []);

  //* Set the wallet address to the state
  const updateCurrentWalletAddress = async () => {
    const accounts = await window?.ethereum?.request({
      method: 'eth_requestAccounts',
    });

    if (accounts) setWalletAddress(accounts[0]);
  };

  return (
    <Web3Context.Provider
      value={{
        walletAddress,
        setWalletAddress,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
