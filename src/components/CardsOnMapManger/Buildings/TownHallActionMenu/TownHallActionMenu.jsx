import React, { useEffect, useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ReactSVG } from 'react-svg';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
// import Divider from '@mui/material/Divider';
import useCardModal from '../../../../hooks/useCardModal.jsx';

import THAMCategory from './THAMCategory/THAMCategory.jsx';
import THAM_Item from './THAMCategory/THAM_Item.jsx';

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
} from 'react-icons/gi';
import { BsBank, BsFillPeopleFill, BsFillBuildingsFill } from 'react-icons/bs';
import {
  FaBabyCarriage,
  FaChargingStation,
  FaExchangeAlt,
  FaRegChartBar,
  FaHouseUser,
  FaRedhat,
} from 'react-icons/fa';

// Utility functions
import {
  calcIncome,
  calcPercentage,
  calcAvailCitizens,
  calcProduction,
  calcSpacing,
} from './utilityFunctions.js';

import useMediaQuery from '@mui/material/useMediaQuery';

import { usePlayerContext } from '../../../../context/playerContext/PlayerContext.jsx';

// Styles
import { townFinances } from './townHallActionMenuStyles.js';
import './TownHallActionMenu.styles.css';
import { roundToDecimal } from '../../../../context/playerContext/utilityFunctions.js';

const Input = styled(MuiInput)`
  width: 60px;
`;

// @NOTE: Remove After Interaction with DB
// Let's say total Pop is 100
// We get gatheringPerHour data from the Card (TechStore) that enchances production. In TechStore the player will be able to upgrade the gathering base production per citizen

// const data = {
//   concrete: {
//     workers: 12,
//     gatheringPerHour: 5,
//   },
//   crystals: {
//     workers: 18,
//     gatheringPerHour: 3,
//   },
//   metals: {
//     workers: 23,
//     gatheringPerHour: 1,
//   },
// };

function InputSlider({
  // data,
  type,
  privateSectorTHAM,
  setPrivateSectorTHAM,
  populationTHAM,
  workerSetter,
  workers,
  calcPrivateSector,
}) {
  function iconFinder() {
    if (type === 'Concrete') return 'concrete';
    if (type === 'Crystals') return 'crystal';
    if (type === 'Metals') return 'steel';
    return console.error(
      '😱 Problem in TownHallActionMenu.jsx in iconFinder()'
    );
  }
  const from600pxAndAfter = useMediaQuery('(min-width: 600px)');
  // 1. CSS: .backdrop => padding: 0;
  // 2. CSS: .secondary-modal => width: clamp(60%, 900px, 100%);
  // 3. CSS: .secondary-modal => padding: 0 12px;
  // 4. JSS: Line 104 <Box> => width: 225

  const [value, setValue] = useState(workers);

  // function syncGlobalState(_newValue) {
  //   if (type === 'Concrete') return 'concrete';
  //   if (type === 'Crystals') return 'crystal';
  //   if (type === 'Metals') return 'steel';
  // }
  // Initializion
  // useEffect(() => {
  //   // Assing the Last known Number of Workers that was fetched from DB
  //   if (type.toLowerCase() === 'concrete') setValue(workers);
  //   if (type.toLowerCase() === 'metals') setValue(workers);
  //   if (type.toLowerCase() === 'crystals') setValue(workers);
  // }, []);

  const caclStep = (value) => {
    if (value < 200) return 1;
    if (value > 1000) return 10;
    if (value > 500) return 5;
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    workerSetter(newValue);
    setPrivateSectorTHAM(calcPrivateSector());
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    workerSetter(event.target.value);
    setPrivateSectorTHAM(calcPrivateSector());
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <Box
      sx={{
        width: from600pxAndAfter ? '100%' : '100%',
        margin: 0,
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* {console.log('CCCVVGG: ', from600pxAndAfter)} */}
      {!Object.is(privateSectorTHAM, NaN) &&
        !Object.is(populationTHAM, undefined) && (
          <>
            {/* {console.log('Available Workers: ', privateSectorTHAM)}
            {console.log(
              'Is Available Workers NaN: ',
              Object.is(privateSectorTHAM, NaN)
            )}

            {console.log('Total Workers: ', populationTHAM)}
            {console.log(
              'Is Total Workers NaN: ',
              Object.is(populationTHAM, NaN)
            )} */}
            <Typography id="input-slider" gutterBottom>
              {`${type} Gathering (Citizens)`}
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <ReactSVG src={`../../../../svg/${iconFinder()}Icon.svg`} />
              </Grid>
              <Grid item xs>
                <Slider
                  value={typeof value === 'number' ? value : 0}
                  max={roundToDecimal(
                    Number(workers) + Number(privateSectorTHAM),
                    0
                  )}
                  // max={Number(populationTHAM) - Number(privateSectorTHAM)}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                />
              </Grid>
              <Grid item>
                <Input
                  value={value}
                  size="small"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: caclStep(
                      roundToDecimal(
                        Number(workers) + Number(privateSectorTHAM),
                        0
                      )
                    ),
                    min: 0,
                    max: roundToDecimal(
                      Number(workers) + Number(privateSectorTHAM),
                      0
                    ),
                    // max: Number(populationTHAM) - Number(privateSectorTHAM),
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
          </>
        )}
    </Box>
  );
}

const TownHallActionMenu = ({
  menuStage,
  setMenuStage,
  townHallLevel,
  // syncPlayerContext,
  // isModalOpen_hook,
}) => {
  // const renderCounter = useRef(0);
  const md760px = useMediaQuery('(min-width: 760px)');

  // const [waitForPlayerContext, setWaitForPlayerContext] = useState(false);

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

    gamePace,
  } = usePlayerContext();

  // console.log('PS ====>> ', workersRef.current.privateSector);
  // console.log('Workers 1 ====>> ', workersRef.current.concreteWorkers);
  // console.log('Workers 2 ====>> ', workersRef.current.metalsWorkers);
  // console.log('Workers 3 ====>> ', workersRef.current.crystalsWorkers);
  console.log('TownHall Level ====>> ', townHallLevelRef.current);

  // Resources
  const [goldTHAM, setGoldTHAM] = useState(materialResourcesRef.current.gold);
  const [populationTHAM, setPopulationTHAM] = useState(
    nonMaterialResourcesRef.current.population
  );

  // Energy
  const [generatedEnergyTHAM, setGeneratedEnergyTHAM] = useState(
    energyRef.current.prodEnergy
  );
  const [requiredEnergyTHAM, setRequiredEnergyTHAM] = useState(
    energyRef.current.requiredEnergy
  );
  const [energyDeltaTHAM, setEnergyDeltaTHAM] = useState(
    energyRef.current.delta
  );

  // Gathering Rates
  const [goldGathRateTHAM, setGoldGathRateTHAM] = useState(
    gatheringRatesRef.current.goldGathRate
  );
  const [popGrowthRateTHAM, setPopGrowthRateTHAM] = useState(
    gatheringRatesRef.current.popGrowthRate
  );

  // Multipliers
  const [goldMultiplierTHAM, setGoldMultiplierTHAM] = useState(
    multipliersRef.current.goldMultiplier
  );
  const [concreteMultiplierTHAM, setConcreteMultiplierTHAM] = useState(
    multipliersRef.current.concreteMultiplier
  );
  const [metalsMultiplierTHAM, setMetalsMultiplierTHAM] = useState(
    multipliersRef.current.metalsMultiplier
  );
  const [crystalsMultiplierTHAM, setCrystalsMultiplierTHAM] = useState(
    multipliersRef.current.crystalsMultiplier
  );

  // Workers
  const [privateSectorTHAM, setPrivateSectorTHAM] = useState(
    workersRef.current.privateSector
  );
  const [concreteWorkersTHAM, setConcreteWorkersTHAM] = useState(
    workersRef.current.concreteWorkers
  );
  const [metalsWorkersTHAM, setMetalsWorkersTHAM] = useState(
    workersRef.current.metalsWorkers
  );
  const [crystalsWorkersTHAM, setCrystalsWorkersTHAM] = useState(
    workersRef.current.crystalsWorkers
  );

  // Spacing
  const [housingSpaceTHAM, setHousingSpaceTHAM] = useState(
    maxLimitsRef.current.housingSpace
  );
  const [buildingsSpaceTHAM, setBuildingsSpaceTHAM] = useState(
    maxLimitsRef.current.buildingsSpace
  );
  const [generatorsSpaceTHAM, setGeneratorsSpaceTHAM] = useState(
    maxLimitsRef.current.generatorsSpace
  );

  const [refreshStats, setRefreshStats] = useState(false); // I just toggle its value to cause a re-render in order for the fresh data to be displayed in the UI
  const [initCompleted, setInitCompleted] = useState(false);

  function calcPrivateSector() {
    const result =
      Number(populationTHAM) -
      Number(concreteWorkersTHAM) -
      Number(metalsWorkersTHAM) -
      Number(crystalsWorkersTHAM);
    return result <= 0 ? 0 : result;
  }

  function roundToDecimal(number, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(number * factor) / factor;
  }

  // useEffect(() => {
  //   if(playerContextInitialized)

  // }, [playerContextInitialized])

  // Update Variables based on the Game Loop
  useEffect(() => {
    if (playerContextInitialized) {
      // People
      setPopulationTHAM(nonMaterialResourcesRef.current.population); // ✅
      setPrivateSectorTHAM(workersRef.current.privateSector); // ✅

      //Energy
      setGeneratedEnergyTHAM(energyRef.current.prodEnergy);
      setRequiredEnergyTHAM(energyRef.current.requiredEnergy);
      setEnergyDeltaTHAM(energyRef.current.delta);

      // Gold ✅
      setGoldTHAM(materialResourcesRef.current.gold); // ✅

      // Rates
      setGoldGathRateTHAM(gatheringRatesRef.current.goldGathRate);
      setPopGrowthRateTHAM(gatheringRatesRef.current.popGrowthRate);

      // Multipliers
      setGoldMultiplierTHAM(multipliersRef.current.goldMultiplier);

      setConcreteMultiplierTHAM(multipliersRef.current.concreteMultiplier);

      setMetalsMultiplierTHAM(multipliersRef.current.metalsMultiplier);

      setCrystalsMultiplierTHAM(multipliersRef.current.crystalsMultiplier);
      console.log('THAM - Gold Gath: ', goldGathRateTHAM);
      // Internal Timer
      const intervalId = setInterval(() => {
        setRefreshStats((prevState) => !prevState);
      }, gamePace * 1000);

      setInitCompleted(true);

      return () => clearInterval(intervalId);
    }
  }, [refreshStats, playerContextInitialized]);

  useEffect(() => {
    if (initCompleted) {
      const calchousingSpace = calcSpacing(townHallLevel, 'housing');
      const calcBuildingSpace = calcSpacing(townHallLevel, 'buildings');
      const calcGeneratorsSpace = calcSpacing(townHallLevel, 'generators');
      setHousingSpaceTHAM(calchousingSpace);
      setBuildingsSpaceTHAM(calcBuildingSpace);
      setGeneratorsSpaceTHAM(calcGeneratorsSpace);

      maxLimitsRef.current.housingSpace = calchousingSpace;
      maxLimitsRef.current.buildingsSpace = calcBuildingSpace;
      maxLimitsRef.current.generatorsSpace = calcGeneratorsSpace;
    }
  }, [townHallLevel, initCompleted]);
  /*
  useEffect(() => {
    renderCounter.current += 1;
    console.log(`======= Rendering - TownHallActionMenu ======`);
    console.log(`Component has rendered ${renderCounter.current} times.`);
    console.log('Has PlayerContext Loaded: ' + playerContextInitialized);
    if (playerContextInitialized) {
      console.log('The income Ref :', ref.current);
      console.log('The private Ref :', pRef.current);

      console.log('Concrete workers: ' + concreteWorkers);
      console.log('Crystals workers: ' + crystalsWorkers);
      console.log('Metals workers: ' + metalsWorkers);
      console.log('Total workers: ' + population);
      console.log('Availalbe workers: ' + privateSectorTHAM);
      setWaitForPlayerContext(true);
    }
  }, [playerContextInitialized]);
*/
  // Update Private Sector
  useEffect(() => {
    if (initCompleted) {
      // setPrivateSectorTHAM(
      //   roundToDecimal(
      //     calcPrivateSector(
      //       Number(populationTHAM),
      //       Number(concreteWorkersTHAM),
      //       Number(crystalsWorkersTHAM),
      //       Number(metalsWorkersTHAM)
      //     )
      //   ),
      //   0
      // );
      setPrivateSectorTHAM(
        calcPrivateSector(
          Number(populationTHAM),
          Number(concreteWorkersTHAM),
          Number(crystalsWorkersTHAM),
          Number(metalsWorkersTHAM)
        )
      );
      // Sync Workers with Global State
      workersRef.current.concreteWorkers = Number(concreteWorkersTHAM);
      workersRef.current.metalsWorkers = Number(metalsWorkersTHAM);
      workersRef.current.crystalsWorkers = Number(crystalsWorkersTHAM);
    }
  }, [
    concreteWorkersTHAM,
    metalsWorkersTHAM,
    crystalsWorkersTHAM,
    initCompleted,
  ]);

  // Update Gold Gathering
  useEffect(() => {
    if (initCompleted) {
      setGoldGathRateTHAM(privateSectorTHAM * goldMultiplierTHAM);

      // Sync Private Sector with Global State
      workersRef.current.privateSector = roundToDecimal(privateSectorTHAM, 4);
      // console.log('1 BBBBB: ', privateSectorTHAM);
    }
  }, [privateSectorTHAM, initCompleted]);

  useEffect(() => {
    if (initCompleted) {
      // Sync Gold Gathering with Global State
      gatheringRatesRef.current.goldGathRate = roundToDecimal(
        goldGathRateTHAM,
        4
      );

      // console.log('1 CCCCC: ', gatheringRatesRef.current.goldGathRate);
    }
  }, [goldGathRateTHAM, initCompleted]);

  return (
    <>
      {playerContextInitialized && initCompleted && (
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
                {`Town's Overview - level (${townHallLevel})`}
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
                {/* Section: Town's Economy */}
                <THAMCategory
                  title={"Town's Economy"}
                  is760px={md760px}
                  // isDevCompleted={true}
                >
                  <THAM_Item
                    text="Income (/h)"
                    icon={
                      <GiTwoCoins
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={roundToDecimal(goldGathRateTHAM, 2)}
                  />{' '}
                  <THAM_Item
                    text="Expenses (/h)"
                    icon={
                      <GiExpense
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={maintenanceRef.current.gold}
                  />{' '}
                  <THAM_Item
                    text="Vault"
                    icon={
                      <BsBank
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={roundToDecimal(goldTHAM, 2)}
                  />{' '}
                </THAMCategory>

                {/* Section: Space Analysis */}
                <THAMCategory title={'Space Analysis'} is760px={md760px}>
                  <THAM_Item
                    text="Housing"
                    icon={
                      <FaHouseUser
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={roundToDecimal(housingSpaceTHAM, 0)}
                  />{' '}
                  <THAM_Item
                    text="Buildings"
                    icon={
                      <BsFillBuildingsFill
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={buildingsSpaceTHAM}
                  />{' '}
                  <THAM_Item
                    text="Generators"
                    icon={
                      <GiWindTurbine
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={generatorsSpaceTHAM}
                  />{' '}
                </THAMCategory>

                {/* Section: Population Analysis */}
                <THAMCategory title={'Population Analysis'} is760px={md760px}>
                  <THAM_Item
                    text="Population"
                    icon={
                      <BsFillPeopleFill
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={roundToDecimal(populationTHAM, 0)}
                  />{' '}
                  <THAM_Item
                    text="Private Sect."
                    icon={
                      <FaRedhat
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={roundToDecimal(privateSectorTHAM, 0)}
                  />{' '}
                  <THAM_Item
                    text="Growth (/h)"
                    icon={
                      <FaBabyCarriage
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={roundToDecimal(popGrowthRateTHAM, 2)}
                  />{' '}
                </THAMCategory>

                {/* Section: Green Energy Production Rate*/}
                <THAMCategory
                  title={'Green Energy Production (MWh)'}
                  is760px={md760px}
                >
                  <THAM_Item
                    text="Generating"
                    icon={
                      <GiGreenPower
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={roundToDecimal(generatedEnergyTHAM, 1)}
                  />{' '}
                  <THAM_Item
                    text="Utilizing"
                    icon={
                      <FaChargingStation
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={roundToDecimal(requiredEnergyTHAM, 1)}
                  />{' '}
                  <THAM_Item
                    text="Remaining"
                    icon={
                      <GiBottledBolt
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={roundToDecimal(energyDeltaTHAM, 1)}
                  />{' '}
                  {/* <THAM_Item
                    text="This Week"
                    icon={
                      <FaRegChartBar
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={test_DisplayFunc()}
                  />{' '}
                  <THAM_Item
                    text="Last Week"
                    icon={
                      <FaRegChartBar
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={test_DisplayFunc()}
                  />
                  <THAM_Item
                    text="Delta"
                    icon={
                      <FaExchangeAlt
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={test_DisplayFunc()}
                  /> */}
                </THAMCategory>

                {/* Section:  Resources Production Rate */}
                <THAMCategory title={'Resources Production'} is760px={md760px}>
                  <THAM_Item
                    text="Concrete (/h)"
                    icon={
                      <GiConcreteBag
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={roundToDecimal(
                      calcProduction(
                        concreteWorkersTHAM,
                        concreteMultiplierTHAM
                      ),
                      1
                    )}
                  />{' '}
                  <THAM_Item
                    text="Metals (/h)"
                    icon={
                      <GiMetalBar
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={roundToDecimal(
                      calcProduction(metalsWorkersTHAM, metalsMultiplierTHAM),
                      1
                    )}
                  />{' '}
                  <THAM_Item
                    text="Crystals (/h)"
                    icon={
                      <GiCrystalGrowth
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={roundToDecimal(
                      calcProduction(
                        crystalsWorkersTHAM,
                        crystalsMultiplierTHAM
                      ),
                      1
                    )}
                  />{' '}
                </THAMCategory>

                {/* Section:  Upgrade Requirements */}
                <THAMCategory
                  title={'Upgrade Requirements'}
                  // isVisible={false}
                  // isDisplayed={md760px ? true : false}
                  is760px={md760px}
                  // isFake={true}
                >
                  <THAM_Item
                    text="Gold"
                    icon={
                      <GiTwoCoins
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={townHallReqRef.current.gold}
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
                    stats={townHallReqRef.current.concrete}
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
                    stats={townHallReqRef.current.metals}
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
                    stats={townHallReqRef.current.crystals}
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
                  display: 'flex',
                  flexDirection: md760px ? 'row' : 'column',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <THAMCategory title="Gold Produced per Hour" is760px={md760px}>
                  <THAM_Item
                    text="Income"
                    icon={
                      <GiTwoCoins
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={roundToDecimal(goldGathRateTHAM, 2)}
                  />

                  <THAM_Item
                    text="Gold per P.S.C"
                    icon={
                      <GiReceiveMoney
                        size={24}
                        color="black"
                        style={{ minWidth: '24px' }}
                      />
                    }
                    stats={roundToDecimal(goldMultiplierTHAM, 1)}
                  />
                </THAMCategory>

                <THAMCategory
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
                    stats={roundToDecimal(
                      calcProduction(
                        concreteWorkersTHAM,
                        concreteMultiplierTHAM
                      ),
                      1
                    )}
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
                    stats={roundToDecimal(
                      calcProduction(metalsWorkersTHAM, metalsMultiplierTHAM),
                      1
                    )}
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
                    stats={roundToDecimal(
                      calcProduction(
                        crystalsWorkersTHAM,
                        crystalsMultiplierTHAM
                      ),
                      1
                    )}
                  />{' '}
                </THAMCategory>
              </Box>
              <Typography variant="h5" align="center" sx={{}} gutterBottom>
                {/* {console.log(
                  'Inside JSX: Available Citizens: ',
                  privateSectorTHAM
                )} */}
                {md760px && (
                  <span>
                    {' '}
                    {`${
                      calcPercentage(populationTHAM, privateSectorTHAM) >= 90
                        ? '🤑 '
                        : ''
                    }`}
                  </span>
                )}
                Available P.S Citizens:{' '}
                <span style={{ whiteSpace: 'nowrap' }}>
                  <span
                    style={{
                      color:
                        calcPercentage(populationTHAM, privateSectorTHAM) > 20
                          ? calcPercentage(populationTHAM, privateSectorTHAM) >
                            60
                            ? '#0755d6'
                            : 'white'
                          : 'red',
                      fontWeight: 600,
                      textShadow:
                        calcPercentage(populationTHAM, privateSectorTHAM) > 60
                          ? '1.5px 1px 1px white'
                          : '1.5px 1px 1px black',
                    }}
                  >
                    {roundToDecimal(privateSectorTHAM, 0)}
                  </span>
                  <span
                    style={{
                      color: 'white',
                      fontWeight: 600,
                      textShadow: '1.5px 1px 1px black',
                    }}
                  >
                    {' '}
                    / {roundToDecimal(populationTHAM, 0)}
                  </span>
                  {md760px && (
                    <span>
                      {' '}
                      {`${
                        calcPercentage(populationTHAM, privateSectorTHAM) >= 90
                          ? ' 🤑'
                          : ''
                      }`}
                    </span>
                  )}
                </span>
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <InputSlider
                  // data={data}
                  type={'Concrete'}
                  privateSectorTHAM={privateSectorTHAM}
                  setPrivateSectorTHAM={setPrivateSectorTHAM}
                  workerSetter={setConcreteWorkersTHAM}
                  workers={concreteWorkersTHAM}
                  populationTHAM={populationTHAM}
                  calcPrivateSector={calcPrivateSector}
                />

                <InputSlider
                  // data={data}
                  type={'Metals'}
                  privateSectorTHAM={privateSectorTHAM}
                  setPrivateSectorTHAM={setPrivateSectorTHAM}
                  workerSetter={setMetalsWorkersTHAM}
                  populationTHAM={populationTHAM}
                  workers={metalsWorkersTHAM}
                  calcPrivateSector={calcPrivateSector}
                />

                <InputSlider
                  // data={data}
                  type={'Crystals'}
                  privateSectorTHAM={privateSectorTHAM}
                  setPrivateSectorTHAM={setPrivateSectorTHAM}
                  workerSetter={setCrystalsWorkersTHAM}
                  populationTHAM={populationTHAM}
                  workers={crystalsWorkersTHAM}
                  calcPrivateSector={calcPrivateSector}
                />
              </Box>
            </Box>
          )}
        </div>
      )}
    </>
  );
};

export default TownHallActionMenu;
