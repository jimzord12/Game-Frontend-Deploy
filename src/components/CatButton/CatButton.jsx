import React from 'react';
import './CatButton.styles.css';

function CatButton({
  icon,
  text,
  image,
  onClick,
  usedFrom,
  specialTreatment = '',
}) {
  function applyCSSClasses() {
    const baseClasses = 'category-btn glow-on-hover';
    if (usedFrom === 'cardActionMenu') return baseClasses + ' card-action-menu';
    return baseClasses;
  }
  return (
    <button
      className={applyCSSClasses()}
      onClick={onClick}
      style={{ ...specialTreatment }}
    >
      {icon !== undefined && icon}
      {text}
      {image !== undefined && (
        <img src={image} alt="" style={{ marginLeft: '10px' }} />
      )}
    </button>
  );
}

export default CatButton;
