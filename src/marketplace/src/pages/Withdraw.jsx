import React, { useState, useEffect } from 'react';

import { useStateContext } from '../context';
import { DisplayCards } from '../components';

const Withdraw = () => {
  const {
    userId,
    axiosPrivate,
    userSoldCards,
    isLoadingSoldCards,
    hasCards4Sale,
    isErrorSoldCards,
  } = useStateContext();

  return (
    <>
      {userId && (
        <DisplayCards
          title="Your Sold Cards"
          isLoading={isLoadingSoldCards}
          isSuccess={hasCards4Sale}
          isErrorSoldCards={isErrorSoldCards}
          cards={userSoldCards}
          from="withdraw"
        />
      )}
    </>
  );
};

export default Withdraw;
