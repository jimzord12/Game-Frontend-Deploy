import { useState } from 'react';
import { ethers } from 'ethers';

import { gameAddress, gameABI } from '../web3/game/constants/index.js';

export function useGameContract() {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @returns A Contract class instance that possess the blockchain functions as methods
   */
  const initialize = async () => {
    if (gameAddress && gameABI && typeof window.ethereum !== 'undefined') {
      setIsLoading(true);
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        if (accounts.length === 0) {
          throw new Error('User is not connected to MetaMask');
        }
        console.log('UseGameCOntract: ', ethers);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(
          gameAddress,
          gameABI,
          signer
        );
        setIsLoading(false);
        console.log('The Game Contact: ', contractInstance);
        return contractInstance;
      } catch (error) {
        setIsLoading(false);
        console.error('Failed to load contract', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { initialize, isLoading };
}
