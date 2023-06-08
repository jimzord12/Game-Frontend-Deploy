import React, { useState, useContext, createContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { usePlayerContext } from '../../../context/playerContext/PlayerContext';
import {
  getAllCardsForSale,
  getAllPlayers,
  getSoldCards,
  deletePurchase,
} from '../../../../api/apiFns';
import useLocationChange from '../hooks/useLocationChange';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // const { state } = useLocation();
  const { fetchedPlayer, materialResourcesRef, playerContextInitialized } =
    usePlayerContext();

  // const onLocationChange = useLocationChange(['allCards']);
  // const { setAuth, auth } = useAuth(); //@Get it from Main App! ✨
  console.log('amsudnasiasdofgj: ', fetchedPlayer);
  const [userId, setUserId] = useState(fetchedPlayer.id); //@Get it from Main App! ✨
  const [cards, setCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  // const [marketplaceCards, setMarketplaceCards] = useState([]);
  const [players, setPlayers] = useState([]); //@Get it from Main App! ✨
  const [playersMapping, setPlayersMapping] = useState({});
  const [userSoldCards, setUserSoldCards] = useState([]);
  const [playerBalance, setPlayerBalance] = useState(
    Math.trunc(materialResourcesRef.current.gold)
  );
  const [isActive, setIsActive] = useState('dashboard');

  //@Get it from Main App! ✨
  const axiosPrivate = 'nothing...xD';

  //@Get it from Main App! ✨
  const playerWallet = fetchedPlayer.wallet;
  // const testingPlayerName = "the collector"

  // #2 - Query - Getting the Cards
  const {
    isSuccess: isSuccessAllCards,
    isLoading: isLoadingAllCards,
    isError: isErrorAllCards,
    error: allCardsError,
    refetch,
  } = useQuery({
    queryKey: ['allCards', axiosPrivate],
    queryFn: getAllCardsForSale,
    refetchOnMount: 'always',
    enabled: playerContextInitialized,
    onSuccess: (fetchedData) => {
      console.log('SUCCESSFUL - All Cards (Marketplace): ', fetchedData);
      setCards(fetchedData);
      setPlayerCards(fetchedData.filter((card) => card.ownerId === userId));
      // setMarketplaceCards(removeElementsFromArray(cards, playerCards));
    },
  });

  // #3 - Query - Getting all Players
  //@Note: Need to get all the PLayers to map ownerID to ownerName or Wallet
  //@Get it from Main App! ✨
  const {
    isSuccess: isSuccessPlayers,
    isLoading: isLoadingPlayers,
    isError: isErrorPlayers,
    error: PlayersError,
  } = useQuery({
    queryKey: ['allPlayers', axiosPrivate],
    queryFn: getAllPlayers,
    enabled: isSuccessAllCards,
    onSuccess: (fetchedData) => {
      console.log('All Cards (Marketplace): ', cards);
      console.log("PLayer's - Cards (Marketplace): ", playerCards);
      console.log('SUCCESSFUL - All Players (Marketplace): ', fetchedData);
      setPlayers(fetchedData);
      setPlayersMapping((prev) => {
        const formatedPlayers = {};
        fetchedData.forEach((player) => {
          formatedPlayers[`${player.id}`] = player.name;
        });
        return { ...prev, ...formatedPlayers };
      });
    },
  });

  const {
    isSuccess: isSoldCardsSuccess,
    isLoading: isLoadingSoldCards,
    refetch: refetchSoldCards,
    isError: isErrorSoldCards,
    // error,
  } = useQuery({
    queryKey: ['playerSoldCards', axiosPrivate, userId],
    queryFn: getSoldCards,
    retry: 0,
    enabled: isSuccessPlayers && players.length > 0,
    onSuccess: (fetchedData) => {
      console.log(
        'SUCCESSFUL - Got Purchase Events (Marketplace): ',
        fetchedData
      );
      //   setUserSoldCards(findSoldCards(playerCards, fetchedData));
      setUserSoldCards(fetchedData);
    },
    onError: (error) => {
      setUserSoldCards([]);
    },
  });

  const { mutate: removePurchaseEvent, isSuccess: hasCards4Sale } = useMutation(
    {
      mutationFn: deletePurchase,
      onSuccess: (data) => {
        console.log('3 - Success - DELETE: ', data);
        refetchSoldCards();
      },
    }
  );
  console.log('hhhhhhhh: ', removePurchaseEvent);

  return (
    <StateContext.Provider
      value={{
        cards,
        playerCards,
        setCards,
        isSuccessAllCards,
        isLoadingAllCards,
        isErrorAllCards,
        allCardsError,
        setUserId,
        userId,
        players,
        playersMapping,
        setPlayerBalance,
        playerBalance,
        isSuccessPlayers,
        isSoldCardsSuccess,
        playerWallet,
        axiosPrivate,
        refetch,
        userSoldCards,
        refetchSoldCards,
        isLoadingSoldCards,
        setIsActive,
        isActive,
        removePurchaseEvent,
        hasCards4Sale,
        isErrorSoldCards,
      }}
    >
      <>
        {isSuccessPlayers ? (
          children
        ) : (
          <h4 className="text-[black] text-2xl font-semibold">
            Loading StateContext
          </h4>
        )}
      </>
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
