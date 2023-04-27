import React, { useState, useEffect } from 'react';

import { DisplayCards } from '../components';
import { useStateContext } from '../context';

const Profile = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [userCards, setUserCards] = useState([]);

  const { cards, userId, isLoadingAllCards, isSuccessPlayers, playerCards } =
    useStateContext();

  useEffect(() => {
    console.log('1 - Profile: Cards: ', cards);
    console.log('1 - Profile: isSuccessPlayers: ', isSuccessPlayers);
    console.log('1 - Profile: userId: ', userId);
    // if (cards.length > 0 && isSuccessPlayers)
    //   console.log("2 - Profile: Cards: ", cards);
    // setUserCards(cards.filter((card) => card.ownerId === userId));
  }, [cards, isSuccessPlayers, userId]);

  return (
    <>
      {isSuccessPlayers && (
        <DisplayCards
          title="Your Cards"
          isLoading={isLoadingAllCards}
          cards={playerCards}
          from="profile"
        />
      )}
    </>
  );
};

export default Profile;
