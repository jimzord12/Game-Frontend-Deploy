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
      {console.log('Location2: ', location)}
      {/* {console.log("Cards: ", cards)}
      {console.log("Got Cards Success: ", isSuccessAllCards)}
      {console.log("Are Cards Loading: ", isLoadingAllCards)}
      {console.log("Is there an Error (Cards): ", isErrorAllCards)}
      {console.log("Cards Error: ", allCardsError)} */}
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
          cards={removeElementsFromArray(cards, playerCards)}
          playerAvatar={playerAvatar}
        />
      )}
    </>
  );
};

export default Home;
