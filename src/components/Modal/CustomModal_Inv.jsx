import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CardGrid from '../CardGrid/CardGrid.jsx';
import CardManager from '../CardManager/CardManager.jsx';
import { useGlobalContext } from '../../context/index.jsx';
import { usePlayerContext } from '../../context/playerContext/PlayerContext.jsx';

// import { Box } from '@mui/material';
// import './InvModal.styles.css';
import './styles.css';
// import {
//   Restaurant,
//   Techstore,
//   TownHall,
// } from '../../myAssets/mapCardRepresentationImages';

// sample data for the available cards
// Rarity 1 => Common, 5 => Legendary

export default function CustomModal_Inv({
  // modalState,
  // children,
  isInvModalOpen,
  setIsInvModalOpen,
}) {
  // const { cardsInInventory } = useGlobalContext();
  const { activeCards, inventoryCards, playerContextInitialized } =
    usePlayerContext();

  const [isOpen, setIsOpen] = useState(isInvModalOpen);
  const [cards, setCards] = useState(inventoryCards);
  const [filteredCardsModal, setFilteredCardsModal] = useState(inventoryCards);
  const [selectedCardModal, setSelectedCardModal] = useState(null); // This holds the selected Card

  const modalRef = useRef();

  useEffect(() => {
    // setIsOpen(isInvModalOpen);
    // console.log('Modal: UseEffect Called!');
    if (playerContextInitialized) setIsOpen(isInvModalOpen);
    console.log('Inventory Modal, UseEffect: Current Cards: ', inventoryCards);
  }, [isInvModalOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleModalClick);

    return () => {
      document.removeEventListener('mousedown', handleModalClick);
    };
  });

  const onFilteredCardsChange = (filteredCards) => {
    setFilteredCardsModal([...filteredCards]);
  };

  function scrollToTop() {
    // const container = document.getElementById('container-id');
    modalRef.current.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }

  // const openModal = () => setIsOpen(true);
  const closeModal = () => setIsInvModalOpen(false);

  // Closes modal when user clicks outside of modal
  const handleModalClick = (e) => {
    if (!modalRef.current?.contains(e.target)) {
      // console.log('Modal Reference: ', modalRef.current);
      closeModal();
    }
  };

  function handleCardClickScroll() {
    scrollToTop();
  }

  return (
    <>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={modalRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.75 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: 'fit-content',
              maxHeight: '85%',
              paddingBottom: '65px',
              zIndex: 10,
              padding: '20px',
              overflowY: 'auto',
              borderTop: '4px solid black',
              background: '#DCE35B',
              background:
                '-webkit-linear-gradient(to bottom, #45B649, #DCE35B)',
              background: 'linear-gradient(to bottom, #45B649, #DCE35B)',
              borderRadius: '15px 15px 0px 0px',
            }}
            onClick={handleModalClick}
          >
            <button
              className="closeBtn"
              style={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                backgroundColor: '#4286f4',
                color: 'white',
                marginTop: '0px',
                padding: '5px 10px',
                borderRadius: '10px',
                boxShadow: '1px 2px 2px 0px black',
              }}
              onClick={closeModal}
            >
              Close
            </button>

            <div className="modal-content">
              {/* <div className="modal-header">
                The Sort / Filtering
                <br />
                Funcs
              </div> */}
              {/* Start - Conditional Rendering Here, when no Card has been selected */}
              {selectedCardModal === null && (
                <div className="modal-body">
                  <div className="filtering-column">
                    <CardManager
                      cards={inventoryCards}
                      onFilteredCardsChange={onFilteredCardsChange}
                    />
                  </div>
                  <div className="card-column">
                    <CardGrid
                      cards={filteredCardsModal}
                      setSelectedCardModal={setSelectedCardModal}
                      selectedCardModal={selectedCardModal}
                      handleCardClickScroll={handleCardClickScroll}
                      currentModal="Inventory"
                      setIsOpen={setIsOpen}
                    />
                  </div>
                </div>
              )}
              {/* End - Conditional Rendering Here, when no Card has been selected */}
              {/* ********************************* */}
              {/* Start - When a Card is selected */}

              {selectedCardModal !== null && (
                <div className="modal-body">
                  {/* <div className="filtering-column">
                    <CardManager
                      cards={cards}
                      onFilteredCardsChange={onFilteredCardsChange}
                    />
                  </div> */}
                  <div className="card-column">
                    <CardGrid
                      cards={filteredCardsModal}
                      setSelectedCardModal={setSelectedCardModal}
                      selectedCardModal={selectedCardModal}
                      currentModal="Inventory"
                      setIsOpen={setIsOpen}
                    />
                  </div>
                  <button
                    className="closeBtn"
                    style={{
                      position: 'absolute',
                      left: '10px',
                      top: '10px',
                      width: 'fit-content',
                      backgroundColor: '#4286f4',
                      color: 'white',
                      marginTop: '0px',
                      padding: '5px 10px',
                      borderRadius: '10px',
                      boxShadow: '1px 2px 2px 0px black',
                    }}
                    onClick={() => setSelectedCardModal(null)}
                  >
                    Go Back
                  </button>
                </div>
              )}
              {/* End - When a Card is selected */}
              <div className="modal-footer">{/* Render the footer here */}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
