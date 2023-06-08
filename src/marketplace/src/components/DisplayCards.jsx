import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FundCard from './FundCard';
import { loader, sold } from '../assets';

const DisplayCards = ({
  title,
  isLoading,
  cards,
  playerAvatar,
  from = 'not-withdraw',
  isSuccess,
  isErrorSoldCards,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (card) => {
    console.log('Displaying Cards: ', card.priceTag);
    if (from === 'profile')
      navigate(`card-details/${card.id}`, {
        state: { card, from },
      });
    navigate(`marketplace/card-details/${card.id}`, { state: { card, from } });
  };
  useEffect(() => {
    console.log('Re-render plz!');
  }, [isSuccess, isErrorSoldCards]);

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({cards.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px] max-md:justify-center">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && cards.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            {from === 'withdraw'
              ? 'None of your cards has been sold as of yet.'
              : from === 'profile'
              ? 'You have no cards for sale.'
              : 'There are no cards for sale at the moment 😓.'}
          </p>
        )}

        {/* {!isLoading &&
          cards.length > 0 &&
          console.log("ALL CARDS: ", from, " => ", cards)} */}
        {!isLoading &&
          cards.length > 0 &&
          cards.map((card, index) => (
            <div key={`card-${card.id}-${index}`}>
              {from === 'withdraw' ? (
                <div className="relative">
                  <div className="absolute w-20 h-20 z-10 top-30">
                    <img className="z-10" src={sold} alt="sold-tag" />
                  </div>
                  <FundCard
                    key={`${from}-${card.id}-${index}`}
                    card={card}
                    handleClick={() => handleNavigate(card)}
                    playerAvatar={playerAvatar}
                    from={from}
                  />
                </div>
              ) : (
                <FundCard
                  key={`${from}-${card.id}-${index}`}
                  card={card}
                  handleClick={() => handleNavigate(card)}
                  playerAvatar={playerAvatar}
                  from={from}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default DisplayCards;
