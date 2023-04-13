import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import ScoreRow from './ScoreRow.jsx';

import { getAllPlayers } from '../../../api/apiFns.js';

import { usePlayerContext } from '../../context/playerContext/PlayerContext.jsx';

import {
  sortedPlayers,
  StoreData,
  GetData,
  CheckForTopThree,
  TopThreeScores,
  findPlayerIndex,
} from './utils.js';

// const dummyData = [
//   { name: 'RushB', rank: 150 },
//   { name: 'RushA', rank: 250 },
//   { name: 'RushC', rank: 350 },
//   { name: 'RushD', rank: 450 },
//   { name: 'RushE', rank: 550 },
//   { name: 'RushF', rank: 650 },
//   { name: 'RushG', rank: 750 },
//   { name: 'RushH', rank: 850 },
//   { name: 'RushJ', rank: 950 },
//   { name: 'aaa', rank: 1150 },
//   { name: 'bbb', rank: 1250 },
//   { name: 'ccc', rank: 1350 },
//   { name: 'ddd', rank: 1450 },
//   { name: 'eee', rank: 1550 },
//   { name: 'fff', rank: 1650 },
//   { name: 'ggg', rank: 1750 },
//   { name: 'rrr', rank: 1850 },
//   { name: 'RushB', rank: 150 },
//   { name: 'RushA', rank: 250 },
//   { name: 'RushC', rank: 350 },
//   { name: 'RushD', rank: 450 },
//   { name: 'RushE', rank: 550 },
//   { name: 'RushF', rank: 650 },
//   { name: 'RushG', rank: 750 },
//   { name: 'RushH', rank: 850 },
//   { name: 'RushJ', rank: 950 },
//   { name: 'aaa', rank: 1150 },
//   { name: 'bbb', rank: 1250 },
//   { name: 'ccc', rank: 1350 },
//   { name: 'ddd', rank: 1450 },
//   { name: 'eee', rank: 1550 },
//   { name: 'fff', rank: 1650 },
//   { name: 'ggg', rank: 1750 },
//   { name: 'rrr', rank: 1850 },
//   { name: 'RushB', rank: 150 },
//   { name: 'RushA', rank: 250 },
//   { name: 'RushC', rank: 350 },
//   { name: 'RushD', rank: 450 },
//   { name: 'RushE', rank: 550 },
//   { name: 'RushF', rank: 650 },
//   { name: 'RushG', rank: 750 },
//   { name: 'RushH', rank: 850 },
//   { name: 'RushJ', rank: 950 },
//   { name: 'aaa', rank: 1150 },
//   { name: 'bbb', rank: 1250 },
//   { name: 'ccc', rank: 1350 },
//   { name: 'ddd', rank: 1450 },
//   { name: 'eee', rank: 1550 },
//   { name: 'fff', rank: 1650 },
//   { name: 'ggg', rank: 1750 },
//   { name: 'rrr', rank: 1850 },
// ];

const AlternatingBackground = (player, allPlayers) => {
  // ✨ 🥩 Here: Query the database for a all the available players (players === rows)
  // ✨ 🥩 Depending on the index I have to apply the correct style to the row
  const playerIndex = findPlayerIndex(player.name, allPlayers);
  const rows = [...document.querySelectorAll('.score-list-row')];
  rows.forEach((row, index) => {
    if (index % 2 === 0) {
      row.style.backgroundColor = 'rgba(121, 20, 99, 0.2)';
    }
    console.log('======================================');
    console.log('1 - AlternatingBackground: ', index);
    console.log('2 - AlternatingBackground: ', playerIndex);
    console.log('======================================');

    if (index === playerIndex)
      row.style.backgroundColor = 'rgba(0, 230, 0, 0.4)';
  });
};

const ScoreRows = ({ refreshData }) => {
  // ✨ 🥩 These need to be changed
  const leaderList = document.querySelector('.score-list-box');
  const [players, setPlayers] = useState([]);
  const [topThree, setTopThree] = useState([]);
  const { fetchedPlayer } = usePlayerContext();

  const { isSuccess, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['players-lb'],
    queryFn: getAllPlayers,
    // enabled: false,
    onSuccess: (fetchedData) => {
      console.log('SUCCESSFUL - ALL PLAYERS (Leaderboard): ', fetchedData);
      setPlayers(sortedPlayers(fetchedData));
      // StoreData('allPlayers', fetchedData);
    },
  });

  const handleRefetch = () => {
    console.log('Leaderboard - Refetching Player Data!');
    refetch();
  };

  useEffect(() => {
    if (players.length > 0) {
      // ✨ 🥩 Use the utils functions with the right sequence to store the data into sessionStorage
      // ✨ 🥩 and then retrieve and display them
      TopThreeScores(players);
      // setTopThree(GetData('top-three'));
      AlternatingBackground(fetchedPlayer, players);
    }
    // else {
    //   error.style.display = 'block';
    //   error.textContent = 'The List is Empty! Please Add More Scores.';
    // }
  }, [players, isSuccess]);

  useEffect(() => {
    handleRefetch();
  }, [refreshData]);

  return (
    <>
      {isError && (
        <div style={{ fontSize: 24 }}>Oops! Something Went Wrong!</div>
      )}
      {/* <Suspense fallback={}> */}
      {isLoading ? (
        <div style={{ fontSize: 24 }}>Loading...</div>
      ) : (
        isSuccess && (
          <div className="wrapper-score-list-box-jz">
            {players.length > 0 ? (
              players.map((player, index) => (
                <ScoreRow
                  player={player}
                  key={`${player.name}-${index}`}
                  index={index}
                />
              ))
            ) : (
              <div>{error}</div>
            )}
          </div>
        )
      )}
      {/* </Suspense> */}
    </>
  );
};

export default ScoreRows;
