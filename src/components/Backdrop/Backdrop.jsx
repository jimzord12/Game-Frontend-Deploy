import { useEffect } from 'react';
// import { stateLogger } from '../../stateLogger';
import { motion } from 'framer-motion';
// import './Backdrop.styles.css';

const Backdrop = ({ children, onClick, disableAnimation }) => {
  if (disableAnimation !== null) {
    return (
      <div className="backdrop" onClick={onClick}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className="backdrop"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
