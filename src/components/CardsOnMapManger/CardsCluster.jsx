import React, { useEffect, useState, useRef } from 'react';

import CardOnMap from './CardOnMap';
// import SecondaryModal from '../Modal/SecondaryModal.jsx';
import CardModal from '../Modal/CardModal.jsx';

// import { useGlobalContext } from '../../context/index.jsx';
import { usePlayerContext } from '../../context/playerContext/PlayerContext';
import useCardModal from '../../hooks/useCardModal.jsx';

import './CardsCluster.styles.css';

import { TownHall } from '../../myAssets/mapCardRepresentationImages';

const CardsCluster = ({ availableSpots = 4 }) => {
  // const renderCounter = useRef(0);

  // const { activeCards, setActiveCards, contextInitialized } =
  //   useGlobalContext();

  const {
    activeCards,
    setActiveCards,
    inventoryCards,
    setInventoryCards,
    playerContextInitialized,
  } = usePlayerContext();
  const { isModalOpen_hook, close, open } = useCardModal(); // This hook controls ::ONLY:: the Secondary Modal State
  // const [contextChanges, setContextChanges] = useState(false);

  const [clickedCardImage, setClickedCardImage] = useState(null);
  const isCardModalOpenRef = useRef(null);
  // useEffect(() => {
  //   console.log(
  //     'CardsCluster.jsx => UseEffect() => activeCards: ',
  //     activeCards
  //   );
  // }, [activeCards]);

  // Here is Hard Code the TownHall Data!
  const townHallCard = {
    templateId: 0,
    name: "Town's Hall",
    type: 'Building',
    rarity: 0,
    level: 3,
    state: false,
    locked: true,
    img: 'TownHall',
    requirements: {},
    output: {},
  };

  // useEffect(() => {
  //   renderCounter.current += 1;
  //   // console.log(`======= Rendering - Cards Cluster ======`);
  //   // console.log(`Component has rendered ${renderCounter.current} times.`);
  // });

  // useEffect(() => {
  //   if (clickedCardImage !== null) {
  //     // console.log('This Card has been Selected: ', clickedCardImage);
  //     // open();
  //   }

  //   // if (contextInitialized && clickedCardImage !== null) {
  //   // if (contextInitialized) {
  //   //   console.log('1. Has Context Initialized: ', contextInitialized);
  //   // } else {
  //   //   console.log('2. Has Context Initialized: ', contextInitialized);
  //   // }
  // }, [clickedCardImage, activeCards, contextInitialized, isModalOpen_hook]);

  function handleCloseModal() {
    isCardModalOpenRef.current = false;

    close();
    // syncPlayerContext();
  }

  function handleCardClick() {
    isCardModalOpenRef.current = true;
    // console.log('ClickHandler: Has Context Initialized: ', contextInitialized);
    open();
  }

  function ModalController() {
    console.log('Is Card Modal Open: ', isModalOpen_hook);
    if (isModalOpen_hook && playerContextInitialized) {
      return (
        <CardModal
          card={clickedCardImage}
          handleClose={handleCloseModal}
          close={close}
          // syncPlayerContext={syncPlayerContext}
          isCardModalOpenRef={isCardModalOpenRef}
          // title={clickedCardImage.name}
          // text={clickedCardImage.info}
          // contentCategory={selectedIslandCategory}
          // isCategorySelected={isCategorySelected}
          // onClick={() => console.log('first')}
        ></CardModal>
      );
    }
  }
  return (
    <div className="cards-cluster-container">
      {/* 3. Secondary Modal - Here is used for the Menu that appears when a card-image is clicked on the Town/Energy map */}

      {clickedCardImage !== null && playerContextInitialized && (
        <ModalController />
      )}

      <CardOnMap
        card={townHallCard}
        key={`Card-ID: 3`}
        onClick={handleCardClick}
        clickedCardImage={clickedCardImage}
        setClickedCardImage={setClickedCardImage}
      />
      {activeCards
        ?.filter((card) => card.type !== 'Special Effect')
        ?.map((card) => (
          <CardOnMap
            card={card}
            key={`Card-ID: ${card.id}`}
            onClick={handleCardClick}
            clickedCardImage={clickedCardImage}
            setClickedCardImage={setClickedCardImage}
          />
        ))}
    </div>
  );
};

export default CardsCluster;
