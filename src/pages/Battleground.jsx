import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles';
import { maps } from '../myAssets';
import { useGlobalContext } from '../context';

function Battleground() {
  const navigate = useNavigate();
  const { setMap, setShowAlert, showAlert } = useGlobalContext();

  console.log('asdasdasdaF : ', maps);
  const handleBattleChoice = (_map) => {
    setMap(_map.id);

    localStorage.setItem('battleground', _map.id);

    setTimeout(() => {
      navigate('/battle');
    }, 350);
  };

  return (
    <div className={`${styles.flexCenter} ${styles.battlegroundContainer}`}>
      {/* {showAlert.status && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )} */}

      <h1 className={`${styles.headText} text-center`}>
        Choose a<span className="text-siteViolet"> Map </span>
      </h1>

      {/* Looping the Battlegrounds Array, and displays every one of the battlegrounds */}
      <div className={`${styles.flexCenter} ${styles.battleGroundsWrapper}`}>
        {maps.map((ground) => (
          <div
            key={ground.id}
            className={`${styles.flexCenter} ${styles.battleGroundCard}`}
            onClick={() => handleBattleChoice(ground)}
          >
            <img
              src={ground.image}
              alt="saiman"
              className={styles.battleGroundCardImg}
            />

            <div className="info absolute">
              <p className={styles.battleGroundCardText}>{ground.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Battleground;
