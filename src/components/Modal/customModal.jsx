import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CardGrid from './CardGrid/CardGrid.jsx';
import { Box } from '@mui/material';

export default function CustomModal({
  modalState,
  children,
  setIsInvModalOpen,
}) {
  const [isOpen, setIsOpen] = useState(modalState);
  useEffect(() => {
    // setIsOpen(modalState);
    console.log('UseEffec Called!');
    setIsOpen(modalState);
  }, [modalState]);

  // const openModal = () => setIsOpen(true);
  const closeModal = () => setIsInvModalOpen(false);

  // sample data for the available cards
  const cards = [
    { name: 'Card 1', type: 'Type A', rarity: 'Rare' },
    { name: 'Card 2', type: 'Type B', rarity: 'Common' },
    { name: 'Card 3', type: 'Type A', rarity: 'Common' },
    { name: 'Card 4', type: 'Type C', rarity: 'Rare' },
  ];

  return (
    <>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: '80%',
              zIndex: 10,
              padding: '20px',
              display: 'grid',
              gridTemplateColumns: '1fr 3fr',
              gridTemplateRows: 'auto auto',
              gap: '20px',
              background: '#DCE35B' /* fallback for old browsers */,
              background:
                '-webkit-linear-gradient(to right, #45B649, #DCE35B)' /* Chrome 10-25, Safari 5.1-6 */,
              background:
                'linear-gradient(to right, #45B649, #DCE35B)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
              borderRadius: '15px 15px 0px 0px',
            }}
          >
            {/* {children} */}

            {/* <Box sx={{ backgroundColor: 'white', justifyContent: 'center' }}> */}
            <button
              style={{
                position: 'absolute',
                right: '28px',
                backgroundColor: 'white',
                marginTop: '32px',
              }}
              onClick={closeModal}
            >
              Close Modal
            </button>
            {/* </Box> */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ paddingBottom: '32px' }}>Sort / Filter Cards</h2>
              <div>
                <label htmlFor="sort-by-type">Sort By Type: </label>
                <select id="sort-by-type">
                  <option value="type-a">Type A</option>
                  <option value="type-b">Type B</option>
                  <option value="type-c">Type C</option>
                </select>
              </div>
              <div>
                <label htmlFor="filter-by-rarity">Filter By Rarity: </label>
                <select id="filter-by-rarity">
                  <option value="rare">Rare</option>
                  <option value="common">Common</option>
                </select>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                overflow: 'auto',
              }}
            >
              {cards.map((card, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '200px',
                    width: '200px',
                    padding: '20px',
                    border: '1px solid gray',
                  }}
                >
                  <h3>{card.name}</h3>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: '1',
                    }}
                  >
                    <p>Type: {card.type}</p>
                    <p>Rarity: {card.rarity}</p>
                  </div>
                  <button>Add to Deck</button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
