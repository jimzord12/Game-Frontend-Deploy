import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

//@ Note: When refactoring, fix this
import THAMCategory from '../Buildings/TownHallActionMenu/THAMCategory/THAMCategory';
import THAM_Item from '../Buildings/TownHallActionMenu/THAMCategory/THAM_Item.jsx';
import AnotherBtn from '../../anotherBtn/AnotherBtn';

import useMediaQuery from '@mui/material/useMediaQuery';
import { usePlayerContext } from '../../../context/playerContext/PlayerContext';

import { roundToDecimal } from '../../../context/playerContext/utilityFunctions.js';

import { updateCardStatsData } from '../../../../api/apiFns';

import {
  GiTwoCoins,
  GiConsoleController,
  GiReceiveMoney,
  GiGreenPower,
  GiWindTurbine,
  GiConcreteBag,
  GiCrystalGrowth,
  GiMetalBar,
  GiBottledBolt,
  GiExpense,
  GiWarPick,
  GiThorHammer,
  GiFurnace,
  GiDrill,
  GiScales,
  GiFingerPrint,
  GiGearHammer,
  GiUpgrade,
} from 'react-icons/gi';
import {
  BsBank,
  BsFillPeopleFill,
  BsFillBuildingsFill,
  BsCalculator,
} from 'react-icons/bs';
import {
  FaBabyCarriage,
  FaChargingStation,
  FaExchangeAlt,
  FaRegChartBar,
  FaHouseUser,
  FaRedhat,
  FaRegCalendarAlt,
} from 'react-icons/fa';

function formatDate(epoch) {
  const date = new Date(epoch);
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() returns 0-based index
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const rarityCoverter = (rarityNumber) => {
  if (rarityNumber === 0) return 'default';
  if (rarityNumber === 1) return { type: 'Common', color: 'white' };
  if (rarityNumber === 2) return { type: 'Special', color: 'limegreen' };
  if (rarityNumber === 3) return { type: 'Rare', color: 'rgb(85, 143, 255)' };
  if (rarityNumber === 4)
    return { type: 'Mythic', color: 'rgb(204, 102, 255)' };
  if (rarityNumber === 5)
    return { type: 'Legendary', color: 'rgb(255, 144, 0)' };
  console.error('😱 Something Wrong at: Card.jsx, in: rarityCoverter()');
};

const CyberTechStoreActionMenu = ({ card, menuStage }) => {
  const {
    // Context Initialization
    playerContextInitialized,

    // TownHall
    townHallLevelRef,
    townHallReqRef,

    // Resources
    nonMaterialResourcesRef,
    materialResourcesRef,

    // Energy
    energyRef,

    // Living Standards
    livingStandardsRef,

    // Rates
    gatheringRatesRef,

    // Multipliers
    multipliersRef,

    // Space
    maxLimitsRef,

    // Workers
    workersRef,

    // Maintenance Costs
    maintenanceRef,
    baseMultis,
    setForceRerender,
    gamePace,
    update,
  } = usePlayerContext();
  const md760px = useMediaQuery('(min-width: 760px)');
  const cardRarity = rarityCoverter(card.rarity);

  // Constants
  // const baseGoldMulti = 20;
  // const baseConcreteMulti = 5;
  // const baseMetalsMulti = 3;
  // const baseCrystalsMulti = 1;
  const levelCosts = {
    0: 2500,
    1: 5000,
    2: 8500,
    3: 13500,
    4: 20000,
    5: 'Max Level',
  };

  const [goldTool, setGoldTool] = useState(card.stats.gold);
  const [concreteTool, setConcreteTool] = useState(card.stats.concrete);
  const [metalsTool, setMetalsTool] = useState(card.stats.metals);
  const [crystalsTool, setCrystalsTool] = useState(card.stats.crystals);
  const [boost_TS, setBoost_TS] = useState(card.output.boost);
  // const [initCompleted, setInitCompleted] = useState(false);

  function calcAndUpdateMultis(type) {
    let base;
    if (type === 'gold') base = baseMultis.baseGoldMulti;
    if (type === 'concrete') base = baseMultis.baseConcreteMulti;
    if (type === 'metals') base = baseMultis.baseMetalsMulti;
    if (type === 'crystals') base = baseMultis.baseCrystalsMulti;
    const result = roundToDecimal(Number(card.stats[`${type}`]) * base, 4);
    multipliersRef.current[`${type}Multiplier`] = result;
  }

  function handleToolUpgrade(type) {
    console.log('You Clicking this Btb Really Hard!!!');
    if (
      materialResourcesRef.current.gold >= levelCosts[card.stats[`${type}`]] &&
      card.stats[`${type}`] < 5
    ) {
      if (card.stats[`${type}`] >= card.level) {
        alert(
          `😱 Your Card's Current level is (${card.level}), which means that that your tools levels can not exceed the level (${card.level})`
        );
        return;
      }
      materialResourcesRef.current.gold -= levelCosts[card.stats[`${type}`]];
      card.stats[`${type}`] += 1;
      calcAndUpdateMultis(type);
      if (type === 'gold') {
        console.log('1 - GOLD 4 ALL: ', card);
        console.log('2 - GOLD 4 ALL: ', card.stats[`${type}`]);
        updateCardStatsData({
          id: card.id,
          gold: card.stats[`${type}`],
        });
        setGoldTool((prev) => (prev += 1));
      }
      if (type === 'concrete') {
        updateCardStatsData({
          id: card.id,
          concrete: card.stats[`${type}`],
        });
        setConcreteTool((prev) => (prev += 1));
      }
      if (type === 'metals') {
        updateCardStatsData({
          id: card.id,
          metals: card.stats[`${type}`],
        });
        setMetalsTool((prev) => (prev += 1));
      }
      if (type === 'crystals') {
        updateCardStatsData({
          id: card.id,
          crystals: card.stats[`${type}`],
        });
        setCrystalsTool((prev) => (prev += 1));
      }
      // setForceRerender((prev) => !prev);
      alert(
        `Incredible! You upgraded the (${type}) enchantment tool! Your current tool level is (${
          card.stats[`${type}`]
        })`
      );
    } else {
      alert(
        '😅 You have reached the maximum level! No futher upgraded are possible'
      );
    }
  }

  useEffect(() => {
    if (playerContextInitialized) {
      console.log('card: ', card);
      setGoldTool(card.stats.gold);
      setConcreteTool(card.stats.concrete);
      setMetalsTool(card.stats.metals);
      setCrystalsTool(card.stats.crystals);
      setBoost_TS(card.output.boost);

      // Internal Timer
      // const intervalId = setInterval(() => {
      //   setRefreshStats((prevState) => !prevState);
      // }, gamePace * 1000);
      // setInitCompleted(true);
      // return () => clearInterval(intervalId);
    }
  }, [
    playerContextInitialized,
    goldTool,
    concreteTool,
    metalsTool,
    crystalsTool,
    card.level,
  ]);

  // useEffect(() => {
  //   if (initCompleted) {
  //   }
  // }, [initCompleted]);

  return (
    <>
      {playerContextInitialized && (
        <div className="town-hall-action-menu-container">
          {menuStage === 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 0px',
              }}
            >
              {/* Section: The Header */}
              <Typography variant="h5" align="center" gutterBottom>
                ✨{' '}
                <span
                  style={{
                    color: cardRarity.color,
                    fontSize: 28,
                    textShadow: 'black 1px 1px 1px',
                    fontWeight: 500,
                  }}
                >
                  {cardRarity.type}
                </span>{' '}
                {` - Level (${card.level})`} ✨
              </Typography>

              {/* The Categories Container */}
              <Grid
                container
                spacing={2}
                direction={md760px ? 'row' : 'column'}
                justifyContent="space-around"
                alignItems={md760px ? 'space-around' : 'center'}
                marginTop={1}
                marginLeft="-9px"
              >
                {/* Section: Card Details */}
                <THAMCategory
                  title={'Card Details'}
                  is760px={md760px}
                  // isDevCompleted={true}
                >
                  <THAM_Item
                    text="ID"
                    icon={
                      <GiFingerPrint
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={card.id}
                  />{' '}
                  <THAM_Item
                    text="Creator"
                    icon={
                      <GiGearHammer
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={card.creator}
                  />{' '}
                  <THAM_Item
                    text="Created"
                    icon={
                      <FaRegCalendarAlt
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={formatDate(card.creationTime)}
                  />{' '}
                </THAMCategory>

                {/* Section: Tools Levels */}
                <THAMCategory title={'Tools Levels'} is760px={md760px}>
                  <THAM_Item
                    text="Calculator"
                    icon={
                      <BsCalculator
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={goldTool}
                  />{' '}
                  <THAM_Item
                    text="Pickaxe"
                    icon={
                      <GiWarPick
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={concreteTool}
                  />{' '}
                  <THAM_Item
                    text="Hammer"
                    icon={
                      <GiThorHammer
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={metalsTool}
                  />{' '}
                  <THAM_Item
                    text="Furnace"
                    icon={
                      <GiFurnace
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={crystalsTool}
                  />{' '}
                </THAMCategory>

                {/* Section: Tools Levels */}
                <THAMCategory title={'Tools Boosts'} is760px={md760px}>
                  <THAM_Item
                    text="Gold"
                    icon={
                      <BsCalculator
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={roundToDecimal(goldTool * boost_TS * 100, 2) + '%'}
                  />{' '}
                  <THAM_Item
                    text="Concrete"
                    icon={
                      <GiWarPick
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={
                      roundToDecimal(concreteTool * boost_TS * 100, 2) + '%'
                    }
                  />{' '}
                  <THAM_Item
                    text="Metals"
                    icon={
                      <GiThorHammer
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={roundToDecimal(metalsTool * boost_TS * 100, 2) + '%'}
                  />{' '}
                  <THAM_Item
                    text="Crystals"
                    icon={
                      <GiFurnace
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={
                      roundToDecimal(crystalsTool * boost_TS * 100, 2) + '%'
                    }
                  />{' '}
                </THAMCategory>

                {/* Section: Upgrade Requirements */}
                <THAMCategory title={'Upgrade Requirements'} is760px={md760px}>
                  <THAM_Item
                    text="Gold"
                    icon={
                      <GiTwoCoins
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={card.requirements.gold}
                  />{' '}
                  <THAM_Item
                    text="Concrete"
                    icon={
                      <GiConcreteBag
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={card.requirements.concrete}
                  />{' '}
                  <THAM_Item
                    text="Metals"
                    icon={
                      <GiMetalBar
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={card.requirements.metals}
                  />{' '}
                  <THAM_Item
                    text="Crystals"
                    icon={
                      <GiCrystalGrowth
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={card.requirements.crystals}
                  />{' '}
                </THAMCategory>
              </Grid>
            </Box>
          )}

          {/* Sliders Menu: Manage Workers */}
          {menuStage === 1 && (
            <Box sx={{ marginTop: 2 }}>
              <Box
                sx={{
                  display: 'flex ',
                  flexDirection: md760px ? 'row' : 'column',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <THAMCategory
                  title="Tool Upgrade Cost (Gold)"
                  is760px={md760px}
                  overrideStyles={{ minWidth: { sm: '48%', lg: '90%' } }}
                >
                  <div className="flex justify-between items-center">
                    <THAM_Item
                      text="Calculator"
                      icon={
                        <BsCalculator
                          size={24}
                          color="black"
                          style={{ minWidth: '24px' }}
                        />
                      }
                      stats={
                        goldTool === 5
                          ? levelCosts[goldTool]
                          : levelCosts[goldTool] +
                            ` (${goldTool} ➡ ${goldTool + 1})`
                      }
                    />
                    <AnotherBtn
                      text={'Hello'}
                      icon={
                        <GiUpgrade
                          size={22}
                          color="white"
                          style={{ minWidth: '24px' }}
                        />
                      }
                      clickHandler={handleToolUpgrade}
                      type="gold"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <THAM_Item
                      text="Pickaxe"
                      icon={
                        <GiWarPick
                          size={24}
                          color="black"
                          style={{ minWidth: '24px' }}
                        />
                      }
                      stats={
                        concreteTool === 5
                          ? levelCosts[concreteTool]
                          : levelCosts[concreteTool] +
                            ` (${concreteTool} ➡ ${concreteTool + 1})`
                      }
                    />
                    <AnotherBtn
                      text={'Hello'}
                      icon={
                        <GiUpgrade
                          size={22}
                          color="white"
                          style={{ minWidth: '24px' }}
                        />
                      }
                      clickHandler={handleToolUpgrade}
                      type="concrete"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <THAM_Item
                      text="Hammer"
                      icon={
                        <GiThorHammer
                          size={24}
                          color="black"
                          style={{ minWidth: '24px' }}
                        />
                      }
                      stats={
                        metalsTool === 5
                          ? levelCosts[metalsTool]
                          : levelCosts[metalsTool] +
                            ` (${metalsTool} ➡ ${metalsTool + 1})`
                      }
                    />
                    <AnotherBtn
                      text={'Hello'}
                      icon={
                        <GiUpgrade
                          size={22}
                          color="white"
                          style={{ minWidth: '24px' }}
                        />
                      }
                      clickHandler={handleToolUpgrade}
                      type="metals"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <THAM_Item
                      text="Furnace"
                      icon={
                        <GiFurnace
                          size={24}
                          color="black"
                          style={{ minWidth: '24px' }}
                        />
                      }
                      stats={
                        crystalsTool === 5
                          ? levelCosts[crystalsTool]
                          : levelCosts[crystalsTool] +
                            ` (${crystalsTool} ➡ ${crystalsTool + 1})`
                      }
                    />{' '}
                    <AnotherBtn
                      text={'Hello'}
                      icon={
                        <GiUpgrade
                          size={22}
                          color="white"
                          style={{ minWidth: '24px' }}
                        />
                      }
                      clickHandler={handleToolUpgrade}
                      type="crystals"
                    />
                  </div>
                </THAMCategory>

                {/* <THAMCategory
                  title={'Resources Prod. per Hour'}
                  is760px={md760px}
                >
                  <THAM_Item
                    text="Concrete"
                    icon={
                      <GiConcreteBag
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={'AAAAAAAAAAA'}
                  />{' '}
                  <THAM_Item
                    text="Metals"
                    icon={
                      <GiMetalBar
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={'AAAAAAAAAAA'}
                  />{' '}
                  <THAM_Item
                    text="Crystals"
                    icon={
                      <GiCrystalGrowth
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={'AAAAAAAAAAA'}
                  />{' '}
                </THAMCategory> */}
              </Box>
            </Box>
          )}
        </div>
      )}
    </>
  );
};

export default CyberTechStoreActionMenu;
