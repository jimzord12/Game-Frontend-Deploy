import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import InventoryModal from "./InventoryModal";
import CustomButton from '../SimpleCustom/CustomButton';
import { useGlobalContext } from '../../context';
import { alertIcon /* , gameRules, battlegrounds */ } from '../../assets';
import styles from '../../styles';

function GameInfo({ props }) {
  const { setIsInventoryOpen } = props;
  const { contract, gameData, setErrorMessage, setShowAlert } =
    useGlobalContext();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const navigate = useNavigate();

  // Handles The Click event on The "Exit Battle" Button
  const handleBattleExit = async () => {
    const battleName = gameData.activeBattle.name;

    try {
      await contract.quitBattle(battleName);

      setShowAlert({
        status: true,
        type: 'info',
        message: `You're quitting the ${battleName}`,
      });
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      {/* This is the Icon "Button" that opens the SideBar */}
      <div className={styles.gameInfoIconBox}>
        <div
          className={`${styles.gameInfoIcon} ${styles.flexCenter}`}
          onClick={() => setToggleSidebar(true)}
        >
          <img src={alertIcon} alt="info" className={styles.gameInfoIconImg} />
        </div>
      </div>

      {/* This is the Side Bar */}
      <div
        className={`${styles.gameInfoSidebar} ${
          toggleSidebar ? 'translate-x-0' : 'translate-x-full'
        } ${styles.glassEffect} ${styles.flexBetween} backdrop-blur-3xl`}
      >
        {/* This the "X" on the Top Right Corner */}
        <div className="flex flex-col w-full m-4">
          <div className={styles.gameInfoSidebarCloseBox}>
            <div
              className={`${styles.flexCenter} ${styles.gameInfoSidebarClose}`}
              onClick={() => setToggleSidebar(false)}
            >
              X
            </div>
          </div>

          {/* The Header Text, "Rules" */}
          {/* <h3 className={styles.gameInfoHeading}>Game Rules:</h3> */}
          {/* Text: Every Rule */}
          <div className="mt-6">
            <CustomButton
              title="MAPS"
              restStyles="w-full"
              handleClick={() => navigate('/battleground')}
            />
          </div>

          {/* <p key={`game-rule-${index}`} className={styles.gameInfoText}>
                  <span className="font-bold">{index + 1}</span>. {rule}
                </p> */}
          <div className="mt-6">
            <CustomButton
              title="INVENTORY"
              restStyles="w-full"
              handleClick={() => setIsInventoryOpen(true)}
            />
          </div>

          <div className="mt-6">
            <CustomButton
              title="MARKETPLACE"
              restStyles="w-full"
              handleClick={() =>
                console.log('Link To Marketplace in WordPress Site')
              }
            />
          </div>

          <div className="mt-6">
            <CustomButton
              title="CRAFT"
              restStyles="w-full"
              handleClick={() => setIsInventoryOpen(true)}
            />
          </div>
        </div>

        {/* The 2 Buttons */}
        <div className={`${styles.flexBetween} mt-10 gap-4 w-full`}>
          {/* Button: Change Battleground */}
          <CustomButton
            title="Change Battleground"
            handleClick={() => navigate('/battleground')}
          />

          {/* Button: Exit Battle */}
          <CustomButton
            title="Exit Battle"
            handleClick={() => handleBattleExit()}
          />
        </div>
      </div>
    </>
  );
}

export default GameInfo;
