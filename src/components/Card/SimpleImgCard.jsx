import React from 'react';
import './simpleImgCard.css';

function Card(props) {
  const handleClick = () => {
    props.onClick(props.text);
  };

  return (
    <div className="craft-card" onClick={handleClick}>
      <img src={props.image} alt={props.text} />
      <div className="text">{props.text}</div>
    </div>
  );
}

export default Card;
