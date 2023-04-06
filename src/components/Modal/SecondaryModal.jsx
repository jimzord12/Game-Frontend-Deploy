// import { useEffect } from 'react';
// import { stateLogger } from '../../stateLogger';
import { motion } from 'framer-motion';
import Backdrop from '../Backdrop/Backdrop.jsx';
import worldModalDivider from '../../myAssets/worldModal/worldModalDivider.png';

import './Secondary.styles.css';
import { Divider } from '@mui/material';
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

const SecondaryModal = ({
  handleClose,
  text,
  title,
  contentCategory,
  isCategorySelected,
  children,
}) => {
  if (contentCategory !== null || isCategorySelected) {
    return (
      <Backdrop onClick={handleClose} disableAnimation={contentCategory}>
        <div className="secondary-modal" onClick={(e) => e.stopPropagation()}>
          <ModalText text={text} title={title} />
          <ModalContent>{children}</ModalContent>
          <ModalButton onClick={handleClose} label="Close" />
        </div>
      </Backdrop>
    );
  }

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        className="secondary-modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <ModalText text={text} title={title} />
        <ModalContent>{children}</ModalContent>
        <ModalButton onClick={handleClose} label="Close" />
      </motion.div>
    </Backdrop>
  );
};

const ModalText = ({ text, title }) => (
  <div className="secondary-modal-text">
    <h3>{title}</h3>
    <img
      src={worldModalDivider}
      alt={'Divider'}
      className="secondary-modal-divider"
    />
    <h5>{text}</h5>
  </div>
);

const ModalContent = ({ children }) => (
  <div className="secondary-modal-content">{children}</div>
);

const ModalButton = ({ onClick, label }) => (
  <motion.button
    className="secondary-modal-button"
    type="button"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {label}
  </motion.button>
);

export default SecondaryModal;
