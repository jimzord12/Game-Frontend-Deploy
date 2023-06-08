/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useEffect, useState } from 'react';
import useSecondaryModal from '../hooks/useCardModal.jsx';

// import dummyInvCards from './dummyInvCards.json';
// import dummyCraftCards from './dummyCraftCards.json';

// import { useNavigate } from 'react-router-dom';
// Here goes a lot of Web3 Code, see original for details

const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [contextInitialized, setContextInitialized] = useState(false);
  const [map, setMap] = useState('bg-town');
  const [activeCards, setActiveCards] = useState([]);
  const [cardsInInventory, setCardsInInventory] = useState([]);
  const [cardsForCrafting, setCardsForCrafting] = useState([]);
  const [showAlert, setShowAlert] = useState({
    status: false,
    type: 'info',
    message: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  //* Set battleground to local storage
  useEffect(() => {
    const isMap = localStorage.getItem('map');

    if (isMap) {
      setMap(isMap);
    } else {
      localStorage.setItem('map', map);
    }
  }, []);

  //* Handle alerts
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: 'info', message: '' });
      }, [5000]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  //* Handle error messages
  useEffect(() => {
    if (errorMessage) {
      const parsedErrorMessage = errorMessage?.reason
        ?.slice('execution reverted: '.length)
        .slice(0, -1);

      if (parsedErrorMessage) {
        setShowAlert({
          status: true,
          type: 'failure',
          message: parsedErrorMessage,
        });
      }
    }
  }, [errorMessage]);

  // Initialization
  // useEffect(() => {
  //   const dummyInvCards = [
  //     {
  //       id: 2,
  //       templateId: 2,
  //       name: 'Solar Panel',
  //       type: 'REG',
  //       rarity: 1,
  //       level: 5,
  //     },
  //     {
  //       id: 3,
  //       name: "Town's Hall",
  //       type: 'Building',
  //       templateId: 3,
  //       rarity: 0,
  //       level: 3,
  //       state: false,
  //       locked: true,
  //       img: TownHall,
  //       requirements: {},
  //       output: {},
  //     },
  //     {
  //       id: 4,
  //       name: 'University',
  //       type: 'Building',
  //       templateId: 4,
  //       rarity: 2,
  //       level: 2,
  //       state: false,
  //       locked: true,
  //       img: 'some-image.png',
  //       requirements: {},
  //       output: {},
  //     },
  //     {
  //       id: 5,
  //       templateId: 5,
  //       name: 'Marketplace',
  //       type: 'Building',
  //       rarity: 3,
  //       level: 1,
  //       state: false,
  //       locked: true,
  //       img: 'some-image.png',
  //       requirements: {},
  //       output: {},
  //     },
  //     {
  //       id: 6,
  //       templateId: 6,
  //       name: 'Hospital',
  //       type: 'Building',
  //       rarity: 5,
  //       level: 3,
  //       state: false,
  //       locked: true,
  //       img: 'some-image.png',
  //       requirements: {},
  //       output: {},
  //     },
  //     {
  //       id: 7,
  //       templateId: 7,
  //       name: 'Workaholism',
  //       type: 'Special Effect',
  //       desc: '25% Resource Gathering',
  //       rarity: 1,
  //       level: 4,
  //       state: false,
  //       locked: true,
  //       img: 'some-image.png',
  //       requirements: {},
  //       output: {},
  //     },
  //     {
  //       id: 8,
  //       templateId: 8,
  //       name: 'Gold Vein',
  //       type: 'Special Effect',
  //       rarity: 4,
  //       level: 5,
  //       state: false,
  //       locked: true,
  //       img: 'some-image.png',
  //       requirements: {},
  //       output: {},
  //     },
  //     {
  //       id: 9,
  //       templateId: 9,
  //       name: 'Refund-Time',
  //       type: 'Special Effect',
  //       rarity: 3,
  //       level: 1,
  //       state: false,
  //       locked: true,
  //       img: 'some-image.png',
  //       requirements: {},
  //       output: {},
  //     },
  //     {
  //       id: 10,
  //       templateId: 10,
  //       name: 'Card 10',
  //       type: 'Type B',
  //       rarity: 2,
  //       level: 2,
  //       state: false,
  //       locked: true,
  //       img: 'some-image.png',
  //       requirements: {},
  //       output: {},
  //     },
  //     {
  //       id: 11,
  //       templateId: 11,
  //       name: 'Card 11',
  //       type: 'Type A',
  //       rarity: 1,
  //       level: 3,
  //       state: false,
  //       locked: true,
  //       img: 'some-image.png',
  //       requirements: {},
  //       output: {},
  //     },
  //     {
  //       id: 12,
  //       templateId: 12,
  //       name: 'Cyber Restaurant',
  //       type: 'Building',
  //       rarity: 4,
  //       level: 3,
  //       state: false,
  //       locked: true,
  //       img: Restaurant,
  //       maintenance: {
  //         population: 2,
  //         metals: 85,
  //       },
  //       requirements: {
  //         gold: 360,
  //         population: 4,
  //         concrete: 120,
  //         metals: 780,
  //       },
  //       output: {
  //         energy: 70,
  //       },
  //     },
  //     {
  //       id: 13,
  //       templateId: 13,
  //       name: 'Cyber TechStore',
  //       type: 'Building',
  //       rarity: 5,
  //       level: 3,
  //       state: false,
  //       locked: true,
  //       img: Techstore,
  //       maintenance: {
  //         population: 2,
  //         metals: 85,
  //       },
  //       requirements: {
  //         gold: 360,
  //         population: 4,
  //         concrete: 120,
  //         metals: 780,
  //       },
  //       output: {
  //         energy: 70,
  //       },
  //     },
  //   ];
  //   const dummyCraftCards = [
  //     {
  //       id: 1,
  //       templateId: 1,
  //       name: 'Wind Turbine',
  //       type: 'REG',
  //       rarity: 3,
  //       level: 1,
  //       state: false,
  //       locked: true,
  //       img: WindTurbine,
  //       maintenance: {
  //         population: 2,
  //         metals: 85,
  //       },
  //       requirements: {
  //         gold: 360,
  //         population: 4,
  //         concrete: 120,
  //         metals: 780,
  //       },
  //       output: {
  //         energy: 70,
  //       },
  //     },
  //     {
  //       id: 2,
  //       templateId: 2,
  //       name: 'Solar Panel',
  //       type: 'REG',
  //       rarity: 1,
  //       level: 5,
  //     },
  //     {
  //       id: 3,
  //       name: "Town's Hall",
  //       type: 'Building',
  //       templateId: 3,
  //       rarity: 0,
  //       level: 3,
  //       state: false,
  //       locked: true,
  //       img: TownHall,
  //       requirements: {},
  //       output: {},
  //     },
  //     {
  //       id: 4,
  //       name: 'University',
  //       type: 'Building',
  //       templateId: 4,
  //       rarity: 2,
  //       level: 2,
  //       state: false,
  //       locked: true,
  //       img: 'some-image.png',
  //       requirements: {},
  //       output: {},
  //     },
  //     {
  //       id: 5,
  //       templateId: 5,
  //       name: 'Marketplace',
  //       type: 'Building',
  //       rarity: 3,
  //       level: 1,
  //       state: false,
  //       locked: true,
  //       img: 'some-image.png',
  //       requirements: {},
  //       output: {},
  //     },
  //     {
  //       id: 6,
  //       templateId: 6,
  //       name: 'Hospital',
  //       type: 'Building',
  //       rarity: 5,
  //       level: 3,
  //       state: false,
  //       locked: true,
  //       img: 'some-image.png',
  //       requirements: {},
  //       output: {},
  //     },
  //     {
  //       id: 7,
  //       templateId: 7,
  //       name: 'Workaholism',
  //       type: 'Special Effect',
  //       desc: '25% Resource Gathering',
  //       rarity: 1,
  //       level: 4,
  //       state: false,
  //       locked: true,
  //       img: 'some-image.png',
  //       requirements: {},
  //       output: {},
  //     },
  //     {
  //       id: 8,
  //       templateId: 8,
  //       name: 'Gold Vein',
  //       type: 'Special Effect',
  //       rarity: 4,
  //       level: 5,
  //       state: false,
  //       locked: true,
  //       img: 'some-image.png',
  //       requirements: {},
  //       output: {},
  //     },
  //     {
  //       id: 9,
  //       templateId: 9,
  //       name: 'Refund-Time',
  //       type: 'Special Effect',
  //       rarity: 3,
  //       level: 1,
  //       state: false,
  //       locked: true,
  //       img: 'some-image.png',
  //       requirements: {},
  //       output: {},
  //     },
  //     {
  //       id: 10,
  //       templateId: 10,
  //       name: 'Card 10',
  //       type: 'Type B',
  //       rarity: 2,
  //       level: 2,
  //       state: false,
  //       locked: true,
  //       img: 'some-image.png',
  //       requirements: {},
  //       output: {},
  //     },
  //     {
  //       id: 11,
  //       templateId: 11,
  //       name: 'Card 11',
  //       type: 'Type A',
  //       rarity: 1,
  //       level: 3,
  //       state: false,
  //       locked: true,
  //       img: 'some-image.png',
  //       requirements: {},
  //       output: {},
  //     },
  //     {
  //       id: 12,
  //       templateId: 12,
  //       name: 'Cyber Restaurant',
  //       type: 'Building',
  //       rarity: 4,
  //       level: 3,
  //       state: false,
  //       locked: true,
  //       img: Restaurant,
  //       maintenance: {
  //         population: 2,
  //         metals: 85,
  //       },
  //       requirements: {
  //         gold: 360,
  //         population: 4,
  //         concrete: 120,
  //         metals: 780,
  //       },
  //       output: {
  //         energy: 70,
  //       },
  //     },
  //     {
  //       id: 13,
  //       templateId: 13,
  //       name: 'Cyber TechStore',
  //       type: 'Building',
  //       rarity: 5,
  //       level: 3,
  //       state: false,
  //       locked: true,
  //       img: Techstore,
  //       maintenance: {
  //         population: 2,
  //         metals: 85,
  //       },
  //       requirements: {
  //         gold: 360,
  //         population: 4,
  //         concrete: 120,
  //         metals: 780,
  //       },
  //       output: {
  //         energy: 70,
  //       },
  //     },
  //   ];
  //   // 1. Fetch Data from database
  //   // 2. Make necessary adjustments
  //   // Και καλα... The Fetched data: dummyInvCards & dummyCraftCards
  //   // console.log('use Effect from Context: Should run 1st');
  //   // Setting the Inventory Cards...
  //   setCardsInInventory(dummyInvCards);
  //   setCardsForCrafting(dummyCraftCards);
  //   setContextInitialized(true);

  //   // Setting the Craftable Cards...
  // }, []);

  return (
    <GlobalContext.Provider
      value={{
        map,
        setMap,
        showAlert,
        setShowAlert,
        errorMessage,
        setErrorMessage,
        useSecondaryModal,
        activeCards,
        setActiveCards,
        cardsInInventory,
        setCardsInInventory,
        cardsForCrafting,
        setCardsForCrafting,
        contextInitialized,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
