import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Link, useHistory } from 'react-router-dom';

import ScoreRows from '../components/ScoreRows/ScoreRows';

import axios from '../../api/api';
// import { usePlayerContext } from '../context/playerContext/PlayerContext';
// import { usePlayerContext } from '../context/playerContext/PlayerContext.jsx';
import '../styles/Leaderboard.styles.css';
// import { useGlobalContext } from '../context';
// const LOGIN_URL = '/authNoPwd';
// const PLAYERS_URL = '/players';
// const walletRegex = /(0x[a-fA-F0-9]{40})/;
// const usernameRegex = /([a-zA-Z][a-zA-Z0-9 ]{0,15})/;

function Leaderboard() {
  const navigate = useNavigate();
  const [refreshData, setRefreshData] = useState(false);

  function handleRefresh() {
    setRefreshData((prev) => !prev);
  }

  const handleLinkClick = () => {
    history.goBack();
  };

  return (
    <div className="root">
      <main>
        {/* <div id="canvas"></div> */}
        <h1 className="page-header">Leaderboard</h1>
        <p className="goback-link" onClick={() => navigate(-1)}>
          Go Back
        </p>
        <div className="container-leaderboard">
          <div className="score-list">
            <div className="title-box">
              <h2 className="sub-title">Ranking List</h2>
              <button
                className="btn-score-submit"
                type="button"
                id="btn-refresh"
                onClick={handleRefresh}
              >
                Refresh <i className="bi bi-arrow-repeat"></i>
              </button>
            </div>
            <div className="score-list-box">
              <ScoreRows refreshData={refreshData} />
            </div>
            <p className="fetch-error"></p>
          </div>
        </div>
      </main>
    </div>
  );
}
// export default Home;

export default Leaderboard;
