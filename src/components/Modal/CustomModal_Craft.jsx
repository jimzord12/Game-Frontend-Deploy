import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CardGrid from '../CardGrid/CardGrid.jsx';
import CardManagerCraft from '../CardManager/CardManagerCraft.jsx';
import SimpleImgCard from '../Card/SimpleImgCard.jsx';
import Building from '../../myAssets/craftModalImgs/building.jpg';
import REG from '../../myAssets/craftModalImgs/REG.png';
import SE_Card from '../../myAssets/craftModalImgs/SE_Card.png';
import './styles.css';
import { useGlobalContext } from '../../context/index.jsx';
import { usePlayerContext } from '../../context/playerContext/PlayerContext.jsx';
import testCardTemplateData from '../../context/playerContext/testCardTemplateData.json';
import { classCard_V2, classCard_Craft } from '../../models/Classes/index.js';
import {
  Restaurant,
  Techstore,
  TownHall,
  WindTurbine,
} from '../../myAssets/mapCardRepresentationImages';
import WindTurbine_V2 from '../../myAssets/cardImages/windTurbine.png';
import workaholismImg from '../../myAssets/temp/workaholism.png';

export default function CustomModal_Craft({
  isCraftModalOpen,
  setIsCraftModalOpen,
}) {
  // const { cardsForCrafting } = useGlobalContext();
  const { activeCards } = usePlayerContext();

  const [isOpen, setIsOpen] = useState(isCraftModalOpen);
  const [cards, setCards] = useState([]);
  const [filteredCardsModal, setFilteredCardsModal] = useState([]);
  const [selectedCardModal, setSelectedCardModal] = useState(null); // This holds the selected Card
  const [typeSelection, setTypeSelection] = useState(null);

  const craftModalRef = useRef();

  // const [initCompleted, setInitCompleted] = useState(false);
  const [cardsInitCompleted, setCardsInitCompleted] = useState(false);
  const hasUseEffectRun = useRef(false);

  const NameToImgMapping = {
    WindTurbine: WindTurbine_V2,
    Workaholism: workaholismImg,
    Techstore: Techstore,
  };

  useEffect(() => {
    setIsOpen(isCraftModalOpen);
  }, [isCraftModalOpen]);

  // Init Cards - Step #1
  useEffect(() => {
    if (!hasUseEffectRun.current) {
      hasUseEffectRun.current = true;
      const cards = cardsInit(testCardTemplateData);
      console.log('Craft Modal: Suka! cards: ', cards);

      setCards(cards);
      setCardsInitCompleted(true);
    }
  }, []);

  // Init State - Step #2
  useEffect(() => {
    if (cardsInitCompleted) {
      console.log('Craft Modal: Filtered cards: ', cards);
      setFilteredCardsModal(cards);
      // setInitCompleted(true);
    }
  }, [cardsInitCompleted]);

  useEffect(() => {
    document.addEventListener('mousedown', handleModalClick);

    return () => {
      document.removeEventListener('mousedown', handleModalClick);
    };
  });

  function cardsInit(obj) {
    console.log('======== Craft Modal Cards ========');
    const cards = [];

    // const inventoryCardsArr = [];
    for (const [key, cardSpecs] of Object.entries(obj)) {
      if (obj.hasOwnProperty(key) && !isNaN(Number(key))) {
        // console.log(key);
        // console.log(cardSpecs);
        const jsCard = new classCard_Craft(cardSpecs, key);
        jsCard.image = NameToImgMapping[jsCard.img];
        cards.push(jsCard);
        console.log('Card ===> ', jsCard);
      }
    }
    console.log('======== ======== ========');
    return cards;
  }

  const onFilteredCardsChange = (filteredCards) => {
    setFilteredCardsModal([...filteredCards]);
  };

  function scrollToTop() {
    // const container = document.getElementById('container-id');
    craftModalRef.current.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }

  const resetCardFilters = () => {
    setFilteredCardsModal([...cards]);
  };

  // const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsCraftModalOpen(false);
  };

  // Closes modal when user clicks outside of modal
  const handleModalClick = (e) => {
    if (!craftModalRef.current?.contains(e.target)) {
      // console.log('Modal Reference: ', craftModalRef.current);
      closeModal();
    }
  };

  function typeFinder(type) {
    if (type === 'reg') return 'Renewable Energy Generators';
    if (type === 'building') return 'Buildings Cards';
    if (type === 'special effect') return 'Special Effect Cards';
  }

  function handleCardClickScroll() {
    scrollToTop();
  }

  function handleSimpleCardSelection(selection) {
    if (selection.toLowerCase() === 'building') {
      setTypeSelection('building');
      // console.log('The', selection, 'Card Type was selected!');
    }

    if (selection.toLowerCase() === 'reg') {
      setTypeSelection('reg');
      // console.log('The', selection, 'Card Type was selected!');
    }

    if (selection.toLowerCase() === 'special effect') {
      setTypeSelection('special effect');
      // console.log('The', selection, 'Card Type was selected!');
    }

    if (typeof selection === 'string') {
      let filteredCards = filteredCardsModal.filter(
        (card) => card.type.toLowerCase() === selection.toLowerCase()
      );
      setFilteredCardsModal([...filteredCards]);
      return;
    }
    throw new Error(
      'SimpleImgCard.jsx: handleSimpleCardSelection() => Invalid arg'
    );
  }

  return (
    <>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <AnimatePresence>
        {isOpen && cardsInitCompleted && (
          <>
            <motion.div
              ref={craftModalRef}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.75 }}
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                overflowY: 'hidden',
                width: '100%',
                height: 'fit-content',
                maxHeight: '85%',
                zIndex: 10,
                padding: '20px',
                paddingBottom: '65px',
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
                  position: 'fixed',
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

              {typeSelection !== null && (
                <button
                  className="closeBtn"
                  style={{
                    position: 'fixed',
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
                  onClick={() => {
                    setTypeSelection(null);
                    resetCardFilters();
                  }}
                >
                  Go Back
                </button>
              )}

              <div className="modal-content">
                {/* Step #1 | Select Type of Card to Craft */}
                {typeSelection === null && (
                  <div className="modal-body unselected">
                    <div className="craft-card-typeSelection-container">
                      <SimpleImgCard
                        image={Building}
                        text="Building"
                        onClick={handleSimpleCardSelection}
                      />

                      <SimpleImgCard
                        image={REG}
                        text="REG"
                        onClick={handleSimpleCardSelection}
                      />

                      <SimpleImgCard
                        image={SE_Card}
                        text="Special Effect"
                        onClick={handleSimpleCardSelection}
                      />
                    </div>
                  </div>
                )}

                {/* Step #2 | Show Available Cards + Filtering Functionality */}

                {/* Step #2.1 | Start - Conditional Rendering Here, when no Card has been selected */}
                {selectedCardModal === null && typeSelection !== null && (
                  <>
                    <div
                      style={{
                        textAlign: 'center',
                        fontSize: '32px',
                        fontWeight: 600,
                        color: 'white',
                        textShadow: '2px 2px black',
                        marginTop: '24px',
                      }}
                    >
                      {typeFinder(typeSelection)}
                    </div>
                    <div className="modal-body">
                      {/* Filtering Functionality */}
                      {/* <div className="filtering-column">
                      <CardManagerCraft
                        cards={cards}
                        onFilteredCardsChange={onFilteredCardsChange}
                        typeSelection={typeSelection}
                      />
                    </div> */}
                      {/* Cards Display Container */}
                      <div className="card-column">
                        <CardGrid
                          cards={filteredCardsModal}
                          setSelectedCardModal={setSelectedCardModal}
                          selectedCardModal={selectedCardModal}
                          handleCardClickScroll={handleCardClickScroll}
                          currentModal="Craft"
                          setIsOpen={setIsOpen}
                        />
                      </div>
                    </div>
                  </>
                )}
                {/* End - Conditional Rendering Here, when no Card has been selected */}
                {/* ********************************* */}

                {/* When a Card is selected/clicked... */}
                {selectedCardModal !== null && (
                  <div className="modal-body">
                    <div className="card-column">
                      <CardGrid
                        cards={filteredCardsModal}
                        setSelectedCardModal={setSelectedCardModal}
                        selectedCardModal={selectedCardModal}
                        currentModal="Craft"
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
                <div className="modal-footer">
                  {/* Render the footer here */}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
