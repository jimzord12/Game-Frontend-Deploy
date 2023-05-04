import React, { lazy, Suspense, useState, useEffect } from 'react';
import './CardActionMenu.styles.css';

// Icons from React-Icons
import { IoStorefront } from 'react-icons/io5';
import { FaPowerOff, FaPeopleCarry } from 'react-icons/fa';
import { GiUpgrade, GiAnvilImpact } from 'react-icons/gi';
import { IoArrowBackCircle, IoFlameSharp } from 'react-icons/io5';

import { usePlayerContext } from '../../context/playerContext/PlayerContext';

import { updateCardData, updatePlayerData } from '../../../api/apiFns';

import { CustomInput } from '../SimpleCustom';

// import { usePlayerContext } from '../../context/playerContext/PlayerContext';

// TownHall
const TownHallActionMenu = lazy(() =>
  import('./Buildings/TownHallActionMenu/TownHallActionMenu.jsx')
);

// REGs
const WindTurbineActionMenu = lazy(() =>
  import('./REGs/WindTurbineActionMenu.jsx')
);

// Buildings
const CyberRestaurantActionMenu = lazy(() =>
  import('./Buildings/CyberRestaurantActionMenu.jsx')
);
const CyberTechstoreActionMenu = lazy(() =>
  import('./Buildings/CyberTechStoreActionMenu.jsx')
);

// Special Effects
const WorkaholismActiomMenu = lazy(() =>
  import('./SE/WorkaholismActiomMenu.jsx')
);

import CatButton from '../CatButton/CatButton.jsx';

const CardActionMenu = ({ card, cardTemplateId, close }) => {
  console.log('>>>%%%%>>>>> : ', card);
  let ComponentToRender;
  let btnsToRender;

  const {
    townHallLevelRef,
    townHallReqRef,
    materialResourcesRef,
    setActiveCards,
    activeCards,
    setInventoryCards,
    inventoryCards,
    setForceRerender,
    maintenanceRef,
  } = usePlayerContext();

  const [menuStage, setMenuStage] = useState(0);
  const [townHallLevel, setTownHallLevel] = useState(townHallLevelRef.current);
  const [componentLevel, setComponentLevel] = useState(null);
  const [showPriceInput, setShowPriceInput] = useState(false);
  const [priceInput, setPriceInput] = useState('');

  const btns = {
    activate: {
      text: 'Activate',
      usedFrom: 'cardActionMenu',
      onClick: handleClickActivate,
      icon: {
        name: IoFlameSharp,
        size: 24,
        color: 'white',
      },
    },
    deactivate: {
      text: 'Deactivate',
      usedFrom: 'cardActionMenu',
      onClick: handleClickDeactivate,
      icon: {
        name: FaPowerOff,
        size: 24,
        color: 'white',
      },
    },
    sell: {
      text: 'Sell',
      usedFrom: 'cardActionMenu',
      onClick: handleClickSell,
      icon: {
        name: IoStorefront,
        size: 24,
        color: 'white',
      },
    },
    levelUp: {
      text: 'Level Up',
      usedFrom: 'cardActionMenu',
      onClick: handleClickLevelUp,
      icon: {
        name: GiUpgrade,
        size: 24,
        color: 'white',
      },
    },
    manage: {
      text: 'Manage',
      usedFrom: 'cardActionMenu',
      onClick: handleClickNextStage,
      icon: {
        name: FaPeopleCarry,
        size: 24,
        color: 'white',
      },
    },
    upgrade: {
      text: 'Upgrade',
      usedFrom: 'cardActionMenu',
      onClick: handleClickNextStage,
      icon: {
        name: GiAnvilImpact,
        size: 24,
        color: 'white',
      },
    },
    goBack: {
      text: 'Go Back',
      usedFrom: 'cardActionMenu',
      onClick: handleClickGoBack,
      icon: {
        name: IoArrowBackCircle,
        size: 24,
        color: 'white',
      },
    },
  };

  // const { playerContextInitialized } = usePlayerContext();

  // useEffect(
  //   () => console.log('IS PLayer Contenxt: ', playerContextInitialized),
  //   [playerContextInitialized]
  // );
  function removeObjectWithId(arr, id) {
    return arr.filter((obj) => obj.id !== id);
  }

  // This functions (TH) is for TownHall's levels handling
  function justTH_LevelUp_Req(currentLevel) {
    if (currentLevel === 1)
      return {
        gold: 1500,
        concrete: 750,
        metals: 350,
        crystals: 100,
      };
    if (currentLevel === 2)
      return {
        gold: 3000,
        concrete: 1500,
        metals: 700,
        crystals: 300,
      };
    if (currentLevel === 3)
      return {
        gold: 5200,
        concrete: 2350,
        metals: 1000,
        crystals: 450,
      };
    if (currentLevel === 4)
      return {
        gold: 12500,
        concrete: 3500,
        metals: 1750,
        crystals: 900,
      };
  }

  function handleTH_LevelUp() {
    if (townHallLevelRef.current < 5) {
      const playerResources = materialResourcesRef.current;
      const townHallReq = townHallReqRef.current;
      let alertFlags = [];

      for (const key in townHallReq) {
        if (Object.hasOwnProperty.call(townHallReq, key)) {
          // Checks if the requirements are met
          console.log(
            `CardActionMenu: TownHall Req (${key}):`,
            townHallReq[key]
          );
          if (playerResources[key] < townHallReq[key]) {
            // If they are NOT...
            alertFlags.push(key);
          }
        }
      }

      if (alertFlags.length === 0) {
        for (const key in townHallReq) {
          // If they are...
          console.log('Old ', key, ' => ', materialResourcesRef.current[key]);
          // 1. Subtract resources
          materialResourcesRef.current[key] -= townHallReq[key];
          console.log('New ', key, ' => ', materialResourcesRef.current[key]);
          console.log('------------------------------------');
        }
        townHallLevelRef.current += 1;
        // const {townhall_lvl: townHallLevelRef.curren}
        // updatePlayerData({id, town        })
        townHallReqRef.current = justTH_LevelUp_Req(townHallLevelRef.current);
        console.log(
          'CardActionMenu: Current TownHall Level: ',
          townHallLevelRef.current
        );
        setTownHallLevel(townHallLevelRef.current);
        alert('💪 Awesome! You just leveled Up your Card!');
      } else {
        alert(`You are short on the following Resources: [${alertFlags}]`);
      }
    } else {
      console.log('CardActionMenu: Max Level Reached!');
    }
  }

  function checkResources() {
    if (card.level < 5) {
      const playerResources = materialResourcesRef.current;
      const cardRequirements = card.requirements;
      let alertFlags = [];

      for (const key in cardRequirements) {
        if (Object.hasOwnProperty.call(cardRequirements, key)) {
          // Checks if the requirements are met
          console.log(
            `CardActionMenu: (${card.name}) Req (${key}):`,
            cardRequirements[key]
          );
          if (playerResources[key] < cardRequirements[key]) {
            // If they are NOT...
            alertFlags.push(key);
          }
        }
      }
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA: ', alertFlags);
      return alertFlags.length === 0 ? true : alertFlags;
    } else {
      return 'maxLevel';
    }
  }

  function subtractResources() {
    const hasEnoughResources = checkResources();
    if (hasEnoughResources === true) {
      for (const key in card.requirements) {
        // If they are...
        console.log('Old ', key, ' => ', materialResourcesRef.current[key]);
        // 1. Subtract resources
        materialResourcesRef.current[key] -= card.requirements[key];
        console.log('New ', key, ' => ', materialResourcesRef.current[key]);
        console.log('------------------------------------');
      }
      card.levelUp();
      console.log('CardActionMenu: Current Card Level: ', card.level);
      alert('💪 Awesome! You just leveled Up your Card!');
    } else if (hasEnoughResources === 'maxLevel') {
      console.log(`CardActionMenu: (${card.name}) Max Level Reached!`);
      alert(
        '💎 Your Card has reached the Maximum level, therefore can not be leveled up any further!'
      );
    } else {
      alert(
        `You are short on the following Resources: [${hasEnoughResources}]`
      );
    }
  }

  // Click Event Handlers
  function handleClickActivate() {}

  function handleClickDeactivate() {
    if (card.type === 'REG') {
      maintenanceRef.current.gold -= card.maintenance.gold;
    }

    console.log('CardActionMenu::Deactivate - Prev: ', card.state);
    card.deactivate();
    console.log('CardActionMenu::Deactivate - New: ', card.state);
    const { state, id } = card;
    updateCardData({ id, state });
    setActiveCards([...removeObjectWithId(activeCards, card.id)]);
    setInventoryCards((prev) => [...prev, card]);
    // setForceRerender((prev) => !prev);
    close();
  }

  function handleClickSell() {
    if (showPriceInput) {
      updateCardData({
        id: card.id,
        state: false,
        in_mp: true,
        priceTag: priceInput,
      });
      setActiveCards([...removeObjectWithId(activeCards, card.id)]);
      close();
      setShowPriceInput(false);
    } else {
      setShowPriceInput(true);
    }
  }

  function handleClickLevelUp() {
    if (cardTemplateId === 0) {
      handleTH_LevelUp();
    } else {
      // It 1st checks if there are enough resources, and then subtract them
      subtractResources();
      setComponentLevel(card.level);
      const { level, id } = card;
      updateCardData({ id, level });
    }
  }

  function handleClickNextStage() {
    setMenuStage(1);
  }

  function handleClickGoBack() {
    setMenuStage(0);
  }

  if (cardTemplateId === 0) {
    ComponentToRender = TownHallActionMenu;
    // Array Index corresponds to menuStage (ex. 0 => menuStage 1)
    btnsToRender = [
      [btns.levelUp, btns.manage],
      [btns.levelUp, btns.goBack],
    ];
  } else if (cardTemplateId === 1) {
    ComponentToRender = WindTurbineActionMenu;
    btnsToRender = [[btns.deactivate, btns.sell, btns.levelUp]];
  } else if (cardTemplateId === 2) {
    ComponentToRender = ComponentB;
  } else if (cardTemplateId === 3) {
    ComponentToRender = ComponentC;
  } else if (cardTemplateId === 4) {
    ComponentToRender = ComponentC;
  } else if (cardTemplateId === 5) {
    ComponentToRender = ComponentC;
  } else if (cardTemplateId === 6) {
    ComponentToRender = ComponentC;
  } else if (cardTemplateId === 7) {
    ComponentToRender = WorkaholismActiomMenu;
    btnsToRender = [[btns.activate, btns.sell, btns.levelUp]];
  } else if (cardTemplateId === 8) {
    ComponentToRender = ComponentC;
  } else if (cardTemplateId === 9) {
    ComponentToRender = ComponentC;
  } else if (cardTemplateId === 10) {
    ComponentToRender = ComponentC;
  } else if (cardTemplateId === 11) {
    ComponentToRender = ComponentC;
  } else if (cardTemplateId === 12) {
    ComponentToRender = CyberRestaurantActionMenu;
  } else if (cardTemplateId === 13) {
    ComponentToRender = CyberTechstoreActionMenu;
    btnsToRender = [
      [btns.deactivate, btns.sell, btns.levelUp, btns.upgrade],
      [btns.levelUp, btns.goBack],
    ];
  } else if (cardTemplateId === 14) {
    ComponentToRender = ComponentC;
  } else {
    ComponentToRender = null;
  }
  //   function constructActionMenu(cardTemplateId) {
  //     return <div></div>;
  //   }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {ComponentToRender && (
        <>
          <div className="card-action-menu-container">
            <ComponentToRender
              menuStage={menuStage}
              setMenuStage={setMenuStage}
              townHallLevel={townHallLevel}
              card={card}
            />
          </div>
          <div className="card-action-menu-btns-container">
            {btnsToRender[menuStage].map((btn, index) => {
              return (
                <CatButton
                  key={`Btn-${btn.text}-${index}`}
                  // icon={<IoStorefront size={24} color="white" />}
                  icon={
                    <btn.icon.name
                      size={btn.icon.size}
                      color={btn.icon.color}
                    />
                  }
                  text={btn.text}
                  usedFrom={btn.usedFrom}
                  onClick={btn.onClick}
                />
              );
            })}
          </div>
          {showPriceInput && (
            <div className="flex justify-center w-full gap-4">
              <CustomInput
                label="Price Tag"
                placeHolder="Ex. 25000"
                Attribs={{
                  onChange: (e) => {
                    setPriceInput(e.target.value);
                    console.log('Price Tag: ', e.target.value);
                  },
                }}
              />
            </div>
          )}
        </>
      )}
    </Suspense>
  );
};

export default CardActionMenu;
/*
{
  cardTemplateId !== 0 && (
    <>
      <CatButton
        icon={<FaPowerOff size={24} color="white" />}
        text={'Deactivate'}
        usedFrom={'cardActionMenu'}
        onClick={handleClickDeactivate}
      />
      <CatButton
        icon={<IoStorefront size={24} color="white" />}
        text={'Sell'}
        usedFrom={'cardActionMenu'}
        onClick={handleClickSell}
      />
    </>
  );
}
<CatButton
  icon={<GiUpgrade size={24} color="white" />}
  text={'Level Up'}
  usedFrom={'cardActionMenu'}
  onClick={handleClickLevelUp}
/>;

{
  menuStage === 0 && (
    <CatButton
      icon={<FaPeopleCarry size={24} color="white" />}
      text={'Management'}
      usedFrom={'cardActionMenu'}
      onClick={handleClickManagement}
      specialTreatment={{ minWidth: '220px' }}
    />
  );
}

{
  menuStage === 1 && (
    <CatButton
      icon={<IoArrowBackCircle size={36} color="white" />}
      text={'Go Back'}
      usedFrom={'cardActionMenu'}
      onClick={handleClickGoBack}
      specialTreatment={{ minWidth: '220px' }}
    />
  );
}
*/
