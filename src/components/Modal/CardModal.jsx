// import { useEffect } from 'react';

// Libraries
import { motion } from 'framer-motion';

// Components
import Backdrop from '../Backdrop/Backdrop.jsx';
import CardActionMenu from '../CardsOnMapManger/CardActionMenu.jsx';
import Card from '../Card/Card.jsx';

// Styles
import './CardModal.styles.css';

import { usePlayerContext } from '../../context/playerContext/PlayerContext.jsx';

// Assets
import worldModalDivider from '../../myAssets/worldModal/worldModalDivider.png';
import cardImages from '../../myAssets/cardImages/windTurbine.png';

// Data
import cardDescriptions from '../../context/cardDescriptions.json';
import { useEffect, useRef, useState } from 'react';
// import { Divider } from '@mui/material';
// import useModal from '../../hooks/useModal.jsx';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

// Utility Functions
function findDesc(cardID) {
  console.log('CardModal.jsx: Card Desc: ', cardDescriptions[0].desc);
  console.log('CardModal.jsx: cardID: ', cardID);
  return cardDescriptions[cardID].desc;
}

const CardModal = ({
  handleClose,
  card,
  close,
  // syncPlayerContext,
  isCardModalOpenRef,
  // contentCategory,
  // isCategorySelected,
  // children,
}) => {
  // const { animationTrackingRef } = usePlayerContext();

  // const { playerContextInitialized } = usePlayerContext();
  // useEffect(() => {
  //   console.log('Has Player Context: ', playerContextInitialized);
  // }, [playerContextInitialized]);
  // if (contentCategory !== null || isCategorySelected) {
  //   return (
  //     <Backdrop onClick={handleClose} disableAnimation={contentCategory}>
  //       <div className="card-modal" onClick={(e) => e.stopPropagation()}>
  //         <ModalText text={text} title={title} />
  //         <ModalContent>{children}</ModalContent>
  //         <ModalButton onClick={handleClose} label="Close" />
  //       </div>
  //     </Backdrop>
  //   );
  // }
  // console.log('>>>>>>>>>>>>', isModalOpen_hook);

  if (true) {
    return (
      <Backdrop onClick={handleClose}>
        <div className="card-modal" onClick={(e) => e.stopPropagation()}>
          <ModalText text={findDesc(card.templateId)} title={card.name} />
          <ModalContent
            card={card}
            close={close}
            // syncPlayerContext={syncPlayerContext}

            // playerContextInitialized={playerContextInitialized}
          />
          <ModalButton onClick={handleClose} label="Close" />
        </div>
      </Backdrop>
    );
  }

  return (
    <>
      {/* {playerContextInitialized && ( */}
      <Backdrop onClick={handleClose}>
        <motion.div
          onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          className="card-modal"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {console.log('CardModal: Card from props: ', card)}
          <ModalText
            text={findDesc(card.templateId)}
            title={card.name}
            // setStopAnimation={setStopAnimation}
          />
          <ModalContent
            card={card}
            // syncPlayerContext={syncPlayerContext}

            // playerContextInitialized={playerContextInitialized}
          />
          <ModalButton onClick={handleClose} label="Close" />
        </motion.div>
      </Backdrop>
      {/* )} */}
    </>
  );
};

const ModalText = ({ text, title }) => {
  return (
    <div className="card-modal-text">
      <h3>{title}</h3>
      <img
        src={worldModalDivider}
        alt={'Divider'}
        className="card-modal-divider"
      />
      <h5>{text}</h5>
    </div>
  );
};

const ModalContent = ({ card, close }) => (
  <div className="card-modal-content">
    {/* <Card
      id={card.id}
      templateId={card.templateId}
      name={card.name}
      type={card.type}
      level={card.level}
      rarity={card.rarity}
      image={cardImages}
      description={'Provides 50 ⚡ per hour'}
      isUsedInCardModal={true}
    /> */}

    <CardActionMenu
      card={card}
      cardTemplateId={card.templateId}
      close={close}
    />
  </div>
);

const ModalButton = ({ onClick, label }) => (
  <motion.button
    className="card-modal-button"
    type="button"
    whileHover={{ scale: 1.13 }}
    whileTap={{ scale: 0.92 }}
    onClick={onClick}
  >
    {label}
  </motion.button>
);

export default CardModal;
