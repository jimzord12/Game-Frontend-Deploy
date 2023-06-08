import React from 'react';

const CustomButton = ({ btnType, title, handleClick, disabled, styles }) => {
  // console.log("Title: ", title, " | Is Disabled: ", disabled);
  const hoverStyles = ' cursor-pointer hover:scale-105 hover:tracking-widest';
  const newStyles = disabled ? styles + ' grayscale' : styles + hoverStyles;
  return (
    <button
      type={btnType}
      disabled={disabled}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] transform transition-all duration-300 ${newStyles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
