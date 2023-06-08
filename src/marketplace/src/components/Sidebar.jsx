import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { logo, sun } from '../assets';
import { navlinks } from '../constants';
import { useStateContext } from '../context';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && 'bg-[#2c2f32]'
    } flex justify-center items-center ${
      !disabled && 'cursor-pointer'
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const { userSoldCards, isActive, setIsActive } = useStateContext();
  const navigate = useNavigate();
  // const [isActive, setIsActive] = useState("dashboard");
  const hasSoldCards = true;

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/battle/" onClick={() => setIsActive('dashboard')}>
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-1">
          {navlinks.map((link, index) => (
            <div key={`NavLink-${link.name}-${index}`}>
              <Icon
                {...link}
                isActive={isActive}
                handleClick={() => {
                  if (!link.disabled) {
                    setIsActive(link.name);
                    navigate(link.link);
                  }
                }}
              />
              {link.name === 'withdraw' && userSoldCards.length > 0 && (
                <div
                  className="relative w-4 h-4 z-10 text-xs font-bold text-white bg-[#E05e0c] border-2 border-white rounded-full dark:border-gray-900 -top-[50px] -right-9"
                  key={`badge-${link.name}-${index}`}
                ></div>
              )}
            </div>
          ))}
        </div>

        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
