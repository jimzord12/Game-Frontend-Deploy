import React from 'react';
import './CardOnMap.styles.css';
import {
  Restaurant,
  Techstore,
  TownHall,
  WindTurbine,
} from '../../myAssets/mapCardRepresentationImages/index.js';
// import useModal from '../../hooks/useSecondaryModal.jsx';

const CardOnMap = ({
  card,
  onClick,
  setClickedCardImage,
  clickedCardImage,
}) => {
  // const { modalOpen, close, open } = useModal(); // This hook controls ::ONLY:: the Secondary Modal State
  // function findImg() {
  //   cardRepresentives.filter((name) => {
  //     name.toLowerCase() === card.name.toLowerCase();
  //   });
  // }

  function handleClick() {
    setClickedCardImage(card);
    onClick();
    // console.log('Card On Map.jsx: ')
  }

  function getImage(imgNameString) {
    if (imgNameString === 'WindTurbine') return WindTurbine;
    if (imgNameString === 'Techstore') return Techstore;
    if (imgNameString === 'TownHall') return TownHall;
    if (imgNameString === 'Restaurant') return Restaurant;
    // if(imgNameString === ) return ;
  }

  return (
    <div className="card-on-map glow-on-hover-v2" onClick={handleClick}>
      {console.log('CardOnMap.jsx::Card: ', card)}
      <img className="" src={getImage(card.img)} alt={card.name} />
    </div>
  );
};

export default CardOnMap;
