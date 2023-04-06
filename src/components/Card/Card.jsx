import { useState } from 'react';
import QuestionMarks_BG from '../../myAssets/cardImages/QuestionMarks_BG.png';
import Tilt from 'react-parallax-tilt';
function Card(props) {
  // const [choosenCard, setChoosenCard] = useState(false);
  const {
    selectedCardModal, // Basically tells the modal that the card resides in, if it has been selected + templateId
    setSelectedCardModal, // If it is selected, returns its ID to modal, so that the modal can display only particular the card
    handleCardClickScroll, // just fixes a scroll animation to improve UX
    isUsedInCardModal = false, // An unproffesional approach to see if the card is currently displayed in the Inventory modal OR the Craft modal
  } = props;

  const handleCardClick = () => {
    if (selectedCardModal !== null) return;
    if (props.currentModal === 'Craft') {
      // console.log('asdbas: ', props);
      setSelectedCardModal(props.templateId);
      return;
    }
    // props.setSelectedCardModal(props.id);
    setSelectedCardModal(props.id);
    // setChoosenCard(true);
    handleCardClickScroll();
    // console.log(
    //   `The ${props.name}, Type: ${props.type}, Level: ${props.level} - Was Clicked!`,
    //   props
    // );
    // console.log(`Card.jsx: Is a Card Selected?: `, selectedCardModal !== null);
  };

  // console.log(`Card.jsx: isUsedInCardModal?: `, isUsedInCardModal);

  const rarityCoverter = (rarityNumber) => {
    // The styles are in Modal > styles.css
    // if (props.type === 'Special Effect') return 'special-effect-bg';
    if (rarityNumber === undefined) return 'craft';
    if (rarityNumber === 0) return 'default';
    if (rarityNumber === 1) return 'common';
    if (rarityNumber === 2) return 'special';
    if (rarityNumber === 3) return 'rare';
    if (rarityNumber === 4) return 'mythic';
    if (rarityNumber === 5) return 'legendary';
    console.error('😱 Something Wrong at: Card.jsx, in: rarityCoverter()');
  };

  const CSSclassesTypeMatcher = (type) => {
    const card = `card ${rarityCoverter(props.rarity)} ${
      props.isDisabled ? 'disabled' : ''
    }`;
    const img = 'card-image';
    const desc = 'card-description';
    const cardName = 'card-name';
    const cardTypeContainer = 'card-type-container';
    const cardLevelContainer = 'card-level-container';
    const cardLevel = 'card-level';

    if (type === 'card') return card;
    if (type === 'img') return img;
    if (type === 'desc') return desc;
    if (type === 'cardName') return cardName;
    if (type === 'cardTypeContainer') return cardTypeContainer;
    if (type === 'cardLevelContainer') return cardLevelContainer;
    if (type === 'cardLevel') return cardLevel;
    return '';
  };

  const applyCSSClasses = (type) => {
    // This means that the card was clicked inside the Inventory or Craft Modal (Yes, I know the naming is awful & confusing 😓)
    const baseCSSClass = CSSclassesTypeMatcher(type);

    // console.log('1) applyCSSClasses: ', baseCSSClass);
    // console.log('2) applyCSSClasses: ', selectedCardModal);
    // console.log('3) applyCSSClasses: ', isUsedInCardModal);
    if (selectedCardModal !== null && selectedCardModal !== undefined)
      return `${baseCSSClass} single-card`;

    // This mean that the map representation of the active Card was clicked.
    if (isUsedInCardModal) {
      return `${baseCSSClass} card-modal-single-card`;
    }

    return baseCSSClass;
  };

  //@ CSS Notes: The current weird architecture design, needs refactoring
  // The css classes:
  //  1. "card" are defined in the Modal's styles.css file
  //  2. "single-card" are defined in the CardGrid's styles.css file
  //  3. "card-modal-single-card" are defined in the CardModal's styles.css file

  return (
    <Tilt>
      <div
        // className={
        //   selectedCardModal === null
        //     ? `card ${rarityCoverter(props.rarity)}`
        //     : `card ${rarityCoverter(props.rarity)} single-card`
        // }
        className={applyCSSClasses('card')}
        onClick={handleCardClick}
      >
        {/* {console.log('Props Rarity: ', rarityCoverter(props.rarity))} */}
        <div className={applyCSSClasses('cardName')}>{props.name}</div>
        <div className="card-stats">
          <div className={applyCSSClasses('cardTypeContainer')}>
            <div className="card-type">{props.type}</div>
          </div>
          {props.level !== undefined && (
            <div className={applyCSSClasses('cardLevelContainer')}>
              <div className={applyCSSClasses('cardLevel')}>{props.level}</div>
            </div>
          )}
        </div>
        <div className={applyCSSClasses('img')}>
          <img src={props.image} alt={props.name} />
        </div>
        <div className={applyCSSClasses('desc')}>{props.description}</div>
        {/* {choosenCard !== null && (
        
      )} */}
      </div>
    </Tilt>
  );
}

export default Card;
