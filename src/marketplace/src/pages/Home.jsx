import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { DisplayCards } from '../components';
import { useStateContext } from '../context';
import { removeElementsFromArray } from '../utils';

const Home = () => {
  // const [isLoading, setIsLoading] = useState(false);

  const {
    cards,
    playerCards,
    isSuccessAllCards,
    isLoadingAllCards,
    isErrorAllCards,
    allCardsError,
    setUserId,
    userId,
    playerAvatar,
  } = useStateContext();

  const location = useLocation();
  // const fetchCards = async () => {
  //   setIsLoading(true);
  //   const data = await getCampaigns();
  //   setCampaigns(data);
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   if (contract) fetchCampaigns();
  // }, [address, contract]);

  return (
    <>
      {isLoadingAllCards && (
        <div>
          <h4 className="text-[white]">Loading...</h4>
        </div>
      )}

      {!isLoadingAllCards && isErrorAllCards && (
        <div>
          <h4 className="text-[white]">This error was received:</h4>
          {/* {console.log(allCardsError)} */}
          <p className="text-[white]">{allCardsError.message}</p>
        </div>
      )}

      {!isLoadingAllCards && isSuccessAllCards && (
        <DisplayCards
          title="Cards For Sale"
          isLoadingAllCards={isLoadingAllCards}
          cards={cards}
          // cards={removeElementsFromArray(cards, playerCards)} // Filters the player's cards, and only display the other players' cards
          playerAvatar={playerAvatar}
        />
      )}
    </>
  );
};

export default Home;
