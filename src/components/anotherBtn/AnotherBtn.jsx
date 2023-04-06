import React from 'react';

import './AnotherBtn.styles.css';
const AnotherBtn = ({ text, icon, clickHandler, type }) => {
  return (
    <button className="another-button" onClick={() => clickHandler(type)}>
      <div className="flex shrink">
        {icon}
        {/* {text} */}
      </div>
    </button>
  );
};

export default AnotherBtn;
