/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from "react-router-dom";

// Components
// import Alert from '../components/Alert';
// Information Bars
import MiniTopBarV2 from '../components/NavBar/MiniTopBarV2.jsx';

// Components realted to Game Mechanics
// 1. SpeedDial (Used to replace The Game Buttons when the screen is small)
import SpeedDial from '../components/SpeedDial/SpeedDial.jsx';

// 2. Game Buttons
import GameBtn from '../components/GameBtn/GameBtn.jsx';

// 3. Modal Windows
import CustomModal_Inv from '../components/Modal/CustomModal_Inv.jsx';
import CustomModal_Craft from '../components/Modal/CustomModal_Craft.jsx';
// import SecondaryModal from '../Modal/SecondaryModal.jsx';

// 4. Map Components
import WorldMap from '../components/WorldMap/WorldMap.jsx';

// 5. Map related Components (This one is the container for Images that represent the Cards on the map)
import CardsCluster from '../components/CardsOnMapManger/CardsCluster.jsx';

// import EffectIndicator from '../components/EffectIndicator/EffectIndicator.jsx';

// Hooks
// Provides the CSS mediaQuery functionlity (Enables CSS-in-JS)
import useMediaQuery from '@mui/material/useMediaQuery';

// A Global Context Provider (It's like a box for putting and retreiving data from anywhere in the App)
import { useGlobalContext } from '../context';
import { usePlayerContext } from '../context/playerContext/PlayerContext.jsx';
import useModal from '../hooks/useCardModal.jsx';

// CSS Styles
import styles from '../styles';

// Assets (Images, Videos, Sounds, etc.)
import { TownDemoMap } from '../myAssets/index.js';
// import workaholismImg from '../myAssets/temp/workaholism.png';

// import maps from '../myAssets';
// import { bigImg } from '../myAssets';

function Battle() {
  const {
    map,
    // setErrorMessage,
    showAlert,
    // setShowAlert,
  } = useGlobalContext();

  const { playerContextInitialized } = usePlayerContext();
  // The States of the Modals - @NOTE!: Make this FALSE when ready!
  const [isInvModalOpen, setIsInvModalOpen] = useState(false);
  const [isCraftModalOpen, setIsCraftModalOpen] = useState(false);
  const { modalOpen, close, open } = useModal(); // This hook controls ::ONLY:: the Secondary Modal State

  const [gold, setGold] = useState(0);
  const [population, setPopulation] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [ranking, setRanking] = useState(0);
  const [concrete, setConcrete] = useState(0);
  const [metals, setMetals] = useState(0);
  const [crystals, setCrystals] = useState(0);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // initialize state and context values
    setIsInitialized(true);
  }, []);

  const isLargeScreen = useMediaQuery('(min-width:900px)');

  // Destined for the Inventory GameBtn Component below
  // function handleInventoryBtn() {
  //   setIsInvModalOpen(true);
  // }

  // Destined for the Inventory GameBtn Component below
  // function handleCraftBtn() {
  //   setIsCraftModalOpen(true);
  // }

  function getMapFromLS() {
    const mapId = localStorage.getItem('map');
  }

  function getMap(_map) {
    if (_map === 'bg-town')
      return (
        <img src={TownDemoMap} alt="Town Map Image" style={styles.bgImg} />
      );
    if (_map === 'bg-energy') return undefined;
    // if (_map === 'bg-island') return undefined;
    if (_map === 'bg-world') return <WorldMap />;
    return console.error(
      '😱 Something Went Wrong at: Battle.jsx, in: getMap()'
    );
  }

  function handleCloseModal() {
    // console.log('Battle.jsx: Closing Secondary Modal...');
    // Put the State setters here
    close();
  }

  return (
    // The Div below is the map
    <div
      className={`relative ${styles.flexBetween} ${styles.gameContainer} ${map} ${styles.blackBg} `}
    >
      {console.log('Current Map: ', map)}
      {/* {showAlert?.status && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )} */}
      {/* {console.log('Battle Page: Map => ', map)} */}

      {getMap(map)}
      {map === ('bg-town' || 'bg-energy') && <CardsCluster />}
      {/* <img src={getMapImage(map)} alt="Town Map Image" style={styles.bgImg} /> */}

      {/* 
      -- Hacky Solution -- 
        We need this state variable (`isInitialized`) to ensure that the Battle.jsx component is rendered 1st and also it's useEffect() runs before its children's useEffect(). If it doesn't run 1st the Card Data, obtained from the Content API, is not initialized on time!
      */}
      {isInitialized && playerContextInitialized && (
        <>
          {/* Note: This Component need refactoring */}
          <MiniTopBarV2
            playerData={{
              stats: { gold, population, energy, ranking },
              resources: { concrete, metals, crystals },
              setters: {
                setGold,
                setPopulation,
                setConcrete,
                setEnergy,
                setRanking,
                setCrystals,
                setMetals,
              },
            }}
          />

          {/* >> Modal Components - Start << */}
          {/* 1. Inventory Modal */}
          <CustomModal_Inv
            isInvModalOpen={isInvModalOpen}
            setIsInvModalOpen={setIsInvModalOpen}
          />

          {/* 2. Craft Modal */}
          <CustomModal_Craft
            isCraftModalOpen={isCraftModalOpen}
            setIsCraftModalOpen={setIsCraftModalOpen}
          />

          {/* 3. Secondary Modal - Here is used for the Menu that appears when a card-image is clicked on the Town/Energy map */}

          {/* <SecondaryModal
            // isOpen={true}
            handleClose={handleCloseModal}
            title={selectedIsland.name}
            text={selectedIsland.info}
            contentCategory={selectedIslandCategory}
            isCategorySelected={isCategorySelected}
            onClick={() => console.log('first')}
          ></SecondaryModal> */}

          {/* >> Modal Components - End << */}

          <SpeedDial
            map={map}
            setIsInvModalOpen={setIsInvModalOpen}
            setIsCraftModalOpen={setIsCraftModalOpen}
          />

          {/* When we have Wide Screen: Maps Button */}
          <div
            style={{
              position: 'fixed',
              top: '2rem',
              right: '2rem',
              display: isLargeScreen ? 'block' : 'none',
              zIndex: 1,
            }}
          >
            <GameBtn
              text={'Maps'}
              action="Maps"
              setIsInvModalOpen={setIsInvModalOpen}
              ripple
              active
            />
          </div>

          {/* When we have Wide Screen: Inventory Button */}
          <div
            style={{
              position: 'fixed',
              top: '6rem',
              right: '2rem',
              display: isLargeScreen ? 'block' : 'none',
              zIndex: 1,
            }}
          >
            <GameBtn
              text={'Inventory'}
              action="Inventory"
              callback={setIsInvModalOpen}
              ripple
              active
            />
          </div>

          {/* When we have Wide Screen: Craft Cards Button */}
          <div
            style={{
              position: 'fixed',
              top: '10rem',
              right: '2rem',
              display: isLargeScreen ? 'block' : 'none',
              zIndex: 1,
            }}
          >
            <GameBtn
              text={'Craft Cards'}
              action="Craft"
              callback={setIsCraftModalOpen}
              ripple
              active
            />
          </div>

          {/* When we have Wide Screen: Marketplace Button */}
          <div
            style={{
              position: 'fixed',
              top: '14rem',
              right: '2rem',
              display: isLargeScreen ? 'block' : 'none',
              zIndex: 1,
            }}
          >
            <GameBtn text={'Marketplace'} action="Marketplace" ripple active />
          </div>

          <div
            style={{
              position: 'fixed',
              top: '18rem',
              right: '2rem',
              display: isLargeScreen ? 'block' : 'none',
              zIndex: 1,
            }}
          >
            <GameBtn text={'Leaderboard'} action="Leaderboard" ripple active />
          </div>
        </>
      )}
    </div>
  );
}

export default Battle;
