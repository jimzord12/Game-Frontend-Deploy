import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

//@Note: When Refactoring, put these components in a separate folder higher up in the directory
import { default as WT_Category } from '../Buildings/TownHallActionMenu/THAMCategory/THAMCategory.jsx';
import { default as WT_Item } from '../Buildings/TownHallActionMenu/THAMCategory/THAM_Item.jsx';

import { usePlayerContext } from '../../../context/playerContext/PlayerContext';
import useMediaQuery from '@mui/material/useMediaQuery';

import './WindTurbineActionMenu.styles.css';

// Icons from React-Icons
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
  GiFingerPrint,
  GiGearHammer,
} from 'react-icons/gi';
import { BsBank, BsFillPeopleFill, BsFillBuildingsFill } from 'react-icons/bs';
import {
  FaBabyCarriage,
  FaChargingStation,
  FaExchangeAlt,
  FaRegChartBar,
  FaHouseUser,
  FaRedhat,
  FaRegCalendarAlt,
} from 'react-icons/fa';
import { MdWindPower } from 'react-icons/md';

function roundToDecimal(number, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
}

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

const WindTurbineActionMenu = ({ card }) => {
  const { playerContextInitialized } = usePlayerContext();
  const md760px = useMediaQuery('(min-width: 760px)');
  const cardRarity = rarityCoverter(card.rarity);

  const [prodEnergyWT, setProdEnergyWT] = useState(card.output.energy);
  const [costsWT, setCostsWT] = useState(card.maintenance.gold);
  const [requirementsWT, setRequirementsWT] = useState(card.requirements);
  const [levelWT, setLevelWT] = useState(card.level);

  useEffect(() => {
    setProdEnergyWT(card.output.energy);
    setCostsWT(card.maintenance.gold);
    setRequirementsWT(card.requirements);
  }, [levelWT]);

  return (
    <div>
      {playerContextInitialized && (
        <div className="town-hall-action-menu-container">
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
              <WT_Category
                title={'Card Details'}
                is760px={md760px}
                // isDevCompleted={true}
              >
                <WT_Item
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
                <WT_Item
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
                <WT_Item
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
              </WT_Category>

              {/* Section: Card Specs */}
              <WT_Category title={'Card Specs'} is760px={md760px}>
                <WT_Item
                  text="Produces (MWh)"
                  icon={
                    <MdWindPower
                      size={24}
                      color="black"
                      style={{ minWidth: '24px' }}
                    />
                  }
                  stats={card.output.energy}
                />{' '}
                <WT_Item
                  text="Costs (/h)"
                  icon={
                    <GiReceiveMoney
                      size={24}
                      color="black"
                      style={{ minWidth: '24px' }}
                    />
                  }
                  stats={card.maintenance.gold}
                />{' '}
              </WT_Category>

              {/* Section: Upgrade Requirements */}
              <WT_Category title={'Upgrade Requirements'} is760px={md760px}>
                <WT_Item
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
                <WT_Item
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
                <WT_Item
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
                <WT_Item
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
              </WT_Category>
            </Grid>
          </Box>
        </div>
      )}
    </div>
  );
};

export default WindTurbineActionMenu;
