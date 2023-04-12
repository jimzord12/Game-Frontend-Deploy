import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Typography,
  Stack,
  Divider,
  Box,
  Container,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ReactSVG } from 'react-svg';
import EffectIndicator from '../EffectIndicator/EffectIndicator';
// import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
// import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
// import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { default as AccessibilityNewIcon } from '@mui/icons-material/Group';
import BoltIcon from '@mui/icons-material/Bolt';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { GiGoldBar } from 'react-icons/gi';

import useMediaQuery from '@mui/material/useMediaQuery';
import { usePlayerContext } from '../../context/playerContext/PlayerContext';
// import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
// import AppleIcon from '@mui/icons-material/Apple';
// import BuildIcon from '@mui/icons-material/Build';
import workaholismImg from '../../myAssets/temp/workaholism.png';

import './styles.css';

// Width: 280 - 430px
function MiniTopBarV2(playerData) {
  const {
    // Context Initialization
    playerContextInitialized,

    // Cards
    activeCards,
    inventoryCards,

    // TownHall
    townHallLevelRef,

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

    // Special Effects
    specialEffectsRef,
    effectDuration,

    // Managing Game Loop
    gamePace,
    waitForGameLoop,
  } = usePlayerContext();

  // Stats
  // const [goldMTB, setGoldMTB] = useState(materialResourcesRef.current.gold);
  // const [populationMTB, setPopulationMTB] = useState(
  //   nonMaterialResourcesRef.current.population
  // );
  // const [rankMTB, setRankMTB] = useState(nonMaterialResourcesRef.current.rank);
  // const [enegyGeneratedMTB, setEnegyGeneratedMTB] = useState(
  //   energyRef.current.prodEnergy
  // );
  // // Reources
  // const [concreteMTB, setConcreteMTB] = useState(
  //   materialResourcesRef.current.concrete
  // );
  // const [metalsMTB, setMetalsMTB] = useState(
  //   materialResourcesRef.current.metals
  // );
  // const [crystalsMTB, setCrystalsMTB] = useState(
  //   materialResourcesRef.current.crystals
  // );

  const [resources, setResources] = useState({
    concrete: roundToDecimal(materialResourcesRef.current.concrete, 1),
    metals: roundToDecimal(materialResourcesRef.current.metals, 1),
    crystals: roundToDecimal(materialResourcesRef.current.crystals, 1),
  });

  const [stats, setStats] = useState({
    gold: roundToDecimal(materialResourcesRef.current.gold, 1),
    population: roundToDecimal(nonMaterialResourcesRef.current.population, 0),
    energy: roundToDecimal(energyRef.current.prodEnergy, 1),
    ranking: roundToDecimal(nonMaterialResourcesRef.current.rank, 0),
  });

  const [isEffectActive, setIsEffectActive] = useState(null);

  const [durationLeft, setDurationLeft] = useState(null);

  // const [activateCardsMTB, setActivateCardsMTB] = useState(activeCards);
  const [refreshStats, setRefreshStats] = useState(false); // I just toggle its value to cause a re-render in order for the fresh data to be displayed in the UI

  // const { playerData: playerData1 } = playerData;
  // const { stats, resources, setters } = playerData1;
  const [showOtherBar, setShowOtherBar] = useState(false);
  const mediaQuery360 = useMediaQuery('(min-width:360px)');
  const mediaQuery480 = useMediaQuery('(min-width:480px)');
  const mediaQuery600 = useMediaQuery('(min-width:600px)');
  const mediaQuery660 = useMediaQuery('(min-width:660px)');
  const mediaQuery760 = useMediaQuery('(min-width:760px)');
  const mediaQuery900 = useMediaQuery('(min-width:900px)');
  const mediaQuery1200 = useMediaQuery('(min-width:1200px)');

  // Styles Regarding the position of the Effect Indicator
  // For the styles that style the component, see its local css fi
  const getstylesEI = () => {
    if (mediaQuery360 && !mediaQuery480)
      return { position: 'fixed', left: '5px', top: '106px' };
    if (mediaQuery480 && !mediaQuery600)
      return { position: 'fixed', right: '2.5%', top: '12px' };
    if (mediaQuery600 && !mediaQuery660)
      return { position: 'fixed', right: '6.5%', top: '12px' };
    if (mediaQuery660 && !mediaQuery760)
      return { position: 'fixed', right: '6%', top: '12px' };
    if (mediaQuery760 && !mediaQuery900)
      return { position: 'fixed', right: '1.5%', top: '12px' };
    if (mediaQuery900 && !mediaQuery1200)
      return { position: 'fixed', right: '31%', top: '12px' };
    if (mediaQuery1200)
      return { position: 'fixed', left: '745px', top: '12px' };
    return { position: 'fixed', left: '5px', top: '100px' };
  };

  useEffect(() => {
    // if (waitForGameLoop) {
    setIsEffectActive((prev) =>
      prev === specialEffectsRef.current.isEffectActive
        ? prev
        : specialEffectsRef.current.isEffectActive
    );
    setDurationLeft((prev) =>
      prev === specialEffectsRef.current.endDate
        ? prev
        : // : specialEffectsRef.current.endDate + effectDuration - 1680048000000
          specialEffectsRef.current.endDate + effectDuration - Date.now()
    );
    console.log('MTB: ActiveCardMTB: ', durationLeft);
    setResources({
      concrete: roundToDecimal(materialResourcesRef.current.concrete, 1),
      metals: roundToDecimal(materialResourcesRef.current.metals, 1),
      crystals: roundToDecimal(materialResourcesRef.current.crystals, 1),
    });
    setStats({
      gold: roundToDecimal(materialResourcesRef.current.gold, 1),
      population: roundToDecimal(nonMaterialResourcesRef.current.population, 0),
      energy: roundToDecimal(energyRef.current.prodEnergy, 1),
      ranking: roundToDecimal(nonMaterialResourcesRef.current.rank, 0),
    });
    // }
  }, [waitForGameLoop]);

  useEffect(() => {
    setResources({
      concrete: roundToDecimal(materialResourcesRef.current.concrete, 1),
      metals: roundToDecimal(materialResourcesRef.current.metals, 1),
      crystals: roundToDecimal(materialResourcesRef.current.crystals, 1),
    });
    setStats({
      gold: roundToDecimal(materialResourcesRef.current.gold, 1),
      population: roundToDecimal(nonMaterialResourcesRef.current.population, 0),
      energy: roundToDecimal(energyRef.current.prodEnergy, 1),
      ranking: roundToDecimal(nonMaterialResourcesRef.current.rank, 0),
    });
    const intervalId = setInterval(() => {
      setRefreshStats((prevState) => !prevState);
    }, gamePace * 1000);

    return () => clearInterval(intervalId);
  }, [refreshStats]);

  function roundToDecimal(number, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(number * factor) / factor;
  }

  const iconFinder = (name) => {
    switch (name) {
      case 'gold':
        return <GiGoldBar size={mediaQuery660 ? 26 : 18} disabled />;

      case 'population':
        return (
          <AccessibilityNewIcon
            fontSize={mediaQuery660 ? 'medium' : 'small'}
            disabled
          />
        );

      case 'energy':
        return (
          <BoltIcon fontSize={mediaQuery660 ? 'medium' : 'small'} disabled />
        );

      case 'ranking':
        return (
          <EmojiEventsIcon
            fontSize={mediaQuery660 ? 'medium' : 'small'}
            disabled
          />
        );

      case 'concrete':
        return <ReactSVG src="../../../svg/concreteIcon.svg" />;

      case 'metals':
        return <ReactSVG src="./../../svg/steelIcon.svg" />;

      case 'crystals':
        return <ReactSVG src="./../../svg/crystalIcon.svg" />;

      default:
        console.error('MiniTopBarV2.jsx | Error: iconFinder()');
        break;
    }
  };

  const visibilityA = (barType) => {
    // Width is below 600px
    if (!mediaQuery600) {
      if (barType === 'resources') {
        return showOtherBar ? 'visible' : 'hidden';
      } else {
        return !showOtherBar ? 'visible' : 'hidden';
      }
    }
    return 'visible';
  };

  const justTheBs = (num) => {
    return Math.trunc(num / 1000000000).toString() + 'b';
  };

  const justTheMills = (num) => {
    return Math.trunc(num / 1000000).toString() + 'm';
  };

  const justTheKs = (num) => {
    return Math.trunc(num / 1000).toString() + 'k';
  };

  function countDigits(num) {
    const numStr = num.toString().replace(/[^0-9]/g, '');
    return numStr.length;
  }

  const shortenLongNum = (number) => {
    // console.log('Number: ', number);
    const digits = countDigits(number);
    // console.log('Digits Count: ', digits);

    // -- Screen: 280px - 359px --
    if (!mediaQuery360 && digits > 10) {
      return justTheBs(Math.floor(number));
    }

    if (!mediaQuery360 && digits > 7) {
      return justTheMills(Math.floor(number));
    }
    if (!mediaQuery360 && digits > 4) {
      if (countDigits(Math.floor(number)) > 4) {
        return justTheKs(Math.floor(number));
      } else return Math.floor(number);
      // if(Math.round(number) > 4)
    }

    // -- Screen: 360px - 599px --
    if (mediaQuery360 && !mediaQuery600 && digits > 9) {
      return justTheMills(Math.floor(number));
    }

    if (mediaQuery360 && !mediaQuery600 && digits > 7) {
      return justTheKs(Math.floor(number));
    }

    // -- Screen: 600px - 899px --
    if (mediaQuery600 && !mediaQuery900 && digits > 9) {
      return justTheMills(Math.floor(number));
    }
    if (mediaQuery600 && !mediaQuery900 && digits > 6) {
      return justTheKs(Math.floor(number));
    }

    // -- Screen: 900px - 1199px --
    if (mediaQuery900 && !mediaQuery1200 && digits > 11) {
      return justTheBs(Math.floor(number));
    }

    if (mediaQuery900 && !mediaQuery1200 && digits > 8) {
      return justTheMills(Math.floor(number));
    }

    if (mediaQuery900 && !mediaQuery1200 && digits > 5) {
      return justTheKs(Math.floor(number));
    }

    // -- Screen: 1200px - max --
    if (mediaQuery1200 && digits > 12) {
      return justTheBs(Math.floor(number));
    }

    if (mediaQuery1200 && digits > 9) {
      return justTheMills(Math.floor(number));
    }

    if (mediaQuery1200 && digits > 6) {
      return justTheKs(Math.floor(number));
    }
    // if (mediaQuery360 && !mediaQuery600 && digits > 7) {
    //   return justTheMills(Math.floor(number));
    // }
    // if (mediaQuery360 && !mediaQuery600 && digits > 4) {
    //   if (countDigits(Math.floor(number)) > 4) {
    //     return justTheKs(Math.floor(number));
    //   } else return Math.floor(number);

    // }
    // const stringifiedNumber = number.toString();
    // if (stringifiedNumber.length >= 7 && !mediaQuery360) {
    //   return justTheMills(number);
    // } else if (stringifiedNumber.length >= 7 && mediaQuery360) {
    //   console.log('⚙😱😱⚙⚙');
    //   return justTheKs(number);
    // }
    // // millions

    // if (stringifiedNumber.length >= 5 && !mediaQuery360) {
    //   return justTheKs(number);
    // } else if (stringifiedNumber.length >= 5 && !mediaQuery360) {
    //   return number;
    // }
    // hundreads
    return number;
  };

  return (
    <div className="flex z-10 fixed">
      {playerContextInitialized && (
        <Box
          // sx={{ position: mediaQuery480 ? 'absolute' : 'static', left: '8px' }}
          sx={{
            position: 'fixed',
            left: '6px',
            zIndex: 10,
            width: mediaQuery1200
              ? '750px'
              : mediaQuery900
              ? '55%'
              : mediaQuery760
              ? '70%'
              : mediaQuery600
              ? '75%'
              : mediaQuery480
              ? '80%'
              : mediaQuery360
              ? '100%'
              : '100%',
          }}
        >
          <Container
            onClick={() => setShowOtherBar(!showOtherBar)}
            disableGutters
          >
            <Grid
              container
              spacing={2}
              // border={2}
              sx={{
                background: '#c21500',
                background:
                  '-webkit-linear-gradient(to right, #FC354C, #0ABFBC)',
                background: 'linear-gradient(to right, #FC354C, #0ABFBC)',
                width: '95%',
                height: '100%',
                margin: '0px',
                marginBottom: '6px',
                marginTop: '6px',
                borderRadius: '5px',
                // visibility: !showOtherBar ? 'visible' : 'hidden',
                visibility: visibilityA('stats'),
                boxShadow: '4px 7px',
              }}
            >
              {Object.entries(stats).map(([stat, value], index) => (
                <Grid key={stat + index} xs={6} sm={3}>
                  <Paper
                    elevation={8}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      padding: '2px 6px',
                      height: '100%',
                    }}
                  >
                    {iconFinder(stat)}
                    <Typography
                      variant={
                        mediaQuery360
                          ? mediaQuery900
                            ? 'h6'
                            : 'body1'
                          : 'body2'
                      }
                      sx={{ fontWeight: '600' }}
                    >
                      {shortenLongNum(value)}
                      {/* {desiredDigits(4, value)} */}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Grid
              container
              spacing={2}
              // border={2}
              sx={{
                background: '#c21500',
                background:
                  '-webkit-linear-gradient(to right, #71B280, #F3A183)',
                background: 'linear-gradient(to right, #71B280, #F3A183)',
                width: '95%',
                margin: '0',
                marginBottom: '6px',
                marginTop: mediaQuery600 ? '12px' : '0px',
                borderRadius: '5px',
                transform: mediaQuery600
                  ? 'translateY(0px)'
                  : 'translateY(-86px)',
                visibility: visibilityA('resources'),
                // visibility: showOtherBar ? 'visible' : 'hidden',
                boxShadow: '4px 7px',
              }}
            >
              {Object.entries(resources).map(([resource, value], index) => (
                <Grid key={resource + index} xs={4} md={4}>
                  <Paper
                    elevation={8}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      padding: '2px 6px',
                    }}
                  >
                    {iconFinder(resource)}
                    <Typography
                      variant={
                        mediaQuery360
                          ? mediaQuery900
                            ? 'h6'
                            : 'body1'
                          : 'body2'
                      }
                      sx={{ fontWeight: '600' }}
                    >
                      {/* {desiredDigits(4, value)} */}
                      {shortenLongNum(value)}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}
      <Box sx={getstylesEI()}>
        {isEffectActive && (
          <EffectIndicator
            // duration={durationLeft}
            // duration={effectDuration}
            image={workaholismImg}
            isEffectActive={isEffectActive}
            tooltipText={'test!!!'}
            effectRef={specialEffectsRef}
          />
        )}
      </Box>
    </div>
  );
}

export default MiniTopBarV2;
