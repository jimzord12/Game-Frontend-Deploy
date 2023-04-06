import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';

// import { setLSItem, getLSItem } from './utilityFunction.js';

import {
  isNewPlayer,
  hasDataInLS,
  calcLivingStandards,
  calcIncome,
  calcPercentage,
  calcAvailCitizens,
  calcProduction,
  calcRank,
  calculateSpacing,
} from './helperFunctions.js';

import testPlayerData from './testPlayerData.json';
import { dummyInvCards, dummyCraftCards } from './testCardData.js';

const PlayerContext = createContext();

// Game's Constants
const livingStandardsBase = 200; // 200% || 2.0 new Ctizens per hour
const startingHousingSpace = 60; // Max Population Limit
const startingBuildingsSpace = 4; // Max Buildings Limit
const startingGeneratorsSpace = 2; // Max Generators Limit

const startingPop = 30;

const startingIncomeMulti = 20;
const startingConcreteMulti = 5;
const startingMetalsMulti = 3;
const startingCrystalsMulti = 1;

export function PlayerContextProvider({ children }) {
  const incomeRef = useRef(null);
  const privateSecRef = useRef(null);

  // The Game States Definitions
  // Initialization Flags, so everything get initialized correctly
  const [firstInitCompleted, setfirstInitCompleted] = useState(false);
  const [secondInitCompleted, setSecondInitCompleted] = useState(false);
  const [finalInitCompleted, setFinalInitCompleted] = useState(false);
  const [playerContextInitialized, setPlayerContextInitialized] =
    useState(false);

  // Player's Non-Material Resources (Top-Left Bar)
  const [gold, setGold] = useState(-1); // Also used in Town's Hall Building (Town's Economy: Vault)
  const [population, setPopulation] = useState(-1); // Also used in Town's Hall Building (Population Analysis)
  const [energy, setEnergy] = useState(-1); // Also used in Town's Hall Building (Green Energy Production: Prod. MWh)
  const [rank, setRank] = useState(-1);

  // Player's Material Resources (Top-Left Bar)
  const [concrete, setConcrete] = useState(-1);
  const [metals, setMetals] = useState(-1);
  const [crystals, setCrystals] = useState(-1);

  // Multiplier's Used for calculating the produced rates (ex. imcome: privateSector * multiplier)
  const [concreteMultiplier, setConcreteMultiplier] = useState(-1);
  const [metalsMultiplier, setMetalsMultiplier] = useState(-1);
  const [crystalsMultiplier, setCrystalsMultiplier] = useState(-1);
  const [incomeMultiplier, setIncomeMultiplier] = useState(-1);

  // Stats visible from Town's Hall Building
  //  1. Town's Economy
  const [income, setIncome] = useState(-1);

  //  2. Space Analysis
  //    2.1,2,3 These values are calculated from the level of the Town's Hall Building through a helper function
  const [housingSpace, setHousingSpace] = useState(-1);
  const [buildingsSpace, setBuildingsSpace] = useState(-1);
  const [generatorsSpace, setGeneratorsSpace] = useState(-1);

  //  3. Population Analysis
  //    3.1 popGrowthRate: Calculated from the population & livingStadards
  const [popGrowthRate, setPopGrowthRate] = useState(-1);
  //    3.2 privateSector: Calculated from the (population - assigned workers)
  const [privateSector, setPrivateSector] = useState(-1);

  //  4. Green Energy Production
  const [requiredEnergy, setRequiredEnergy] = useState(-1);

  //  5. Resources Production (Gathering Rates) Their values are calculated from the workers obtained from the database
  //    5.1,2,3 [type]GathRate: Calculated from the [type]Workers & a multiplier that can be increased from a building in the future
  const [concreteGathRate, setConcreteGathRate] = useState(-1);
  const [metalsGathRate, setMetalsGathRate] = useState(-1);
  const [crystalsGathRate, setCrystalsGathRate] = useState(-1);

  const [livingStadards, setLivingStadards] = useState(-1);

  //  6. The assigned workers, used to calculate the resource production
  // const [totalWorkers, setTotalWorkers] = useState(undefined); Not needed, is the some as the population state variable
  const [concreteWorkers, setConcreteWorkers] = useState(-1);
  const [crystalsWorkers, setCrystalsWorkers] = useState(-1);
  const [metalsWorkers, setMetalsWorkers] = useState(-1);
  // const [availWorkers, setAvailWorkers] = useState(undefined);

  // Scoped helper functions
  function initializeNewPlayer() {
    // Statistics
    // @Note: Therotically this should not be 0, when the tutorial is ready, change it
    // @Note: Just create the required code for them some time,future me 😅, ♥ yeah..
    // This one is good!
    setLivingStadards(livingStandardsBase);

    // Citizens Management
    setConcreteWorkers(0);
    setCrystalsWorkers(0);
    setMetalsWorkers(0);
    setPrivateSector(
      population
      // calcAvailCitizens(
      //   population,
      //   concreteWorkers,
      //   crystalsWorkers,
      //   metalsWorkers
      // )
    );

    // Resources
    setGold(0);
    setPopulation(startingPop);
    setEnergy(0);
    setConcrete(0);
    setMetals(0);
    setCrystals(0);

    // Rates
    setIncome(calcIncome(privateSector, startingIncomeMulti)); //Gold
    setConcreteGathRate(startingConcreteMulti);
    setMetalsGathRate(startingMetalsMulti);
    setCrystalsGathRate(startingCrystalsMulti);
    setPopGrowthRate(Number(livingStadards) / 100);

    // Limitations
    setHousingSpace(startingHousingSpace);
    setBuildingsSpace(startingBuildingsSpace);
    setGeneratorsSpace(startingGeneratorsSpace);
    setRequiredEnergy(0);

    // Scores & Ranks
    setRank(calcRank());
    // setHasPlayerInitialized(true);
  }

  /**
   * - Explaining The Initialization Technic -
   * Most of React's Hooks and provided functions are async to boost performance.
   * This becomes a big problem when you start using Non-async functions that depend on React's async features.
   * To work around this, I have created some initialization steps that use flags to fix the order of the function execution.
   * The correct utilization of the useEffect hook is vital, you must know how the dependency array works and when it must be empty or check for flag changes
   */

  function firstStepInit() {
    console.log('(1) - Initializing 1st Step...');

    // This one is good!
    setLivingStadards(livingStandardsBase);

    // Resources
    setGold(testPlayerData.resources.gold);
    setPopulation(testPlayerData.resources.population);
    setEnergy(testPlayerData.resources.energy);
    setConcrete(testPlayerData.resources.concrete);
    setMetals(testPlayerData.resources.metals);
    setCrystals(testPlayerData.resources.crystals);

    // Citizens Management
    setConcreteWorkers(testPlayerData.workers.concrete);
    setMetalsWorkers(testPlayerData.workers.metals);
    setCrystalsWorkers(testPlayerData.workers.crystals);

    // Multipliers
    setIncomeMultiplier(startingIncomeMulti);
    setConcreteMultiplier(startingConcreteMulti);
    setMetalsMultiplier(startingMetalsMulti);
    setCrystalsMultiplier(startingCrystalsMulti);

    // Limitations
    setHousingSpace(startingHousingSpace);
    setBuildingsSpace(startingBuildingsSpace);
    setGeneratorsSpace(startingGeneratorsSpace);

    // Scores & Ranks
    setRank(calcRank());
    // setFirstStepInitialized(true);
    //Finishing Init
    setfirstInitCompleted(true);
  }

  //@Note: needs data fecthing! For testing I use local json file.
  function secondStepInit() {
    console.log('(2) - Initializing 2nd Step...');

    console.log('1. >>>>>> Pop: ', population);
    console.log('2. >>>>>> Workers Con', concreteWorkers);
    console.log('3. >>>>>> Workers Cry', crystalsWorkers);
    console.log('4. >>>>>> Workers M', metalsWorkers);
    console.log('5. >>>>>> Gold: ', gold);
    console.log('6. >>>>>> Energy: ', energy);
    console.log('7. >>>>>> Concrete: ', concrete);
    console.log('8. >>>>>> metals: ', metals);
    console.log('9. >>>>>> crystals: ', crystals);
    console.log('10. >>>>>> Income Multi: ', gold);
    console.log('11. >>>>>> Concrete Multi: ', gold);
    console.log('12. >>>>>> Metals Multi: ', gold);
    console.log('13. >>>>>> Crystals Multi: ', gold);
    console.log('14. >>>>>> Housing: ', gold);
    console.log('15. >>>>>> Buildings Space: ', gold);
    console.log('16. >>>>>> Generators Spave: ', gold);
    console.log('17. >>>>>> Rank: ', rank);
    console.log('##################################');

    setPrivateSector(
      calcAvailCitizens(
        population,
        concreteWorkers,
        crystalsWorkers,
        metalsWorkers
      )
    );

    setRequiredEnergy(0); //@Note change this after tutorial!

    // Rates
    setConcreteGathRate(calcProduction(concreteWorkers, startingConcreteMulti));
    setMetalsGathRate(calcProduction(metalsWorkers, startingMetalsMulti));
    setCrystalsGathRate(calcProduction(crystalsWorkers, startingCrystalsMulti));
    setPopGrowthRate(Number(livingStadards) / 100);
    setSecondInitCompleted(true);
  }

  function finalStepInit() {
    console.log('(3) - Initializing 3rd Step...');
    console.log('1. >>>>>> Private Sector: ', privateSector);
    console.log('2. >>>>>> Required Energy: ', requiredEnergy);
    console.log('3. >>>>>> Concrete Gathering Rate: ', concreteGathRate);
    console.log('4. >>>>>> Metals Gathering Rate: ', metalsGathRate);
    console.log('5. >>>>>> Crystals Gathering Rate: ', crystalsGathRate);
    console.log('6. >>>>>> Population Growth Rate: ', popGrowthRate);
    console.log('##################################');

    setIncome(calcIncome(privateSector, startingIncomeMulti));
    incomeRef.current = income;
    privateSecRef.current = privateSector;
    setFinalInitCompleted(true);
  }

  // Starts 1st Init Step
  useEffect(() => {
    // @Note: Fetch Data from DB to check if is registered
    if (isNewPlayer(testPlayerData.playerId)) {
      console.log(
        'New Player 😁 Detected! Player ID: ',
        testPlayerData.playerId
      );
      initializeNewPlayer();
    } else {
      console.log(
        'Old Player 😎 Detected! Player ID: ',
        testPlayerData.playerId
      );
      firstStepInit();
    }
  }, []);

  // Starts 2nd Init Step
  useEffect(() => {
    if (firstInitCompleted) {
      secondStepInit();
    }
  }, [firstInitCompleted]);

  // Starts 3rd Init Step
  useEffect(() => {
    if (secondInitCompleted) {
      finalStepInit();
    }
  }, [secondInitCompleted]);

  // Waits until all steps have finished
  useEffect(() => {
    console.log('(4) - Initializing final Step...');
    console.log('1. >>>>>> Income: ', income);
    console.log('Double Checking...');
    console.log('First Step Init Completed: ', firstInitCompleted);
    console.log('Second Step Init Completed: ', secondInitCompleted);
    console.log('Final Step Init Completed: ', finalInitCompleted);
    console.log('##################################');

    if (firstInitCompleted && secondInitCompleted && finalInitCompleted) {
      setPlayerContextInitialized(true);
    }
  }, [firstInitCompleted, secondInitCompleted, finalInitCompleted]);

  console.log('Player Context Rerendered!');

  return (
    <PlayerContext.Provider
      value={{
        ref: incomeRef,
        pRef: privateSecRef,
        playerContextInitialized, // This is used so that the components that use the player context wait until it is first;y initialized, otherwise unexpected things happen 😭
        setGold,
        gold,
        setPopulation,
        population,
        setEnergy,
        energy,
        setRank,
        rank,
        setConcrete,
        concrete,
        setMetals,
        metals,
        setCrystals,
        crystals,
        setIncome,
        income,
        setHousingSpace,
        housingSpace,
        setBuildingsSpace,
        buildingsSpace,
        setGeneratorsSpace,
        generatorsSpace,
        setPopGrowthRate,
        popGrowthRate,
        setPrivateSector,
        privateSector,
        setRequiredEnergy,
        requiredEnergy,
        setConcreteGathRate,
        concreteGathRate,
        setMetalsGathRate,
        metalsGathRate,
        setCrystalsGathRate,
        crystalsGathRate,
        setLivingStadards,
        livingStadards,
        setConcreteWorkers,
        concreteWorkers,
        setCrystalsWorkers,
        crystalsWorkers,
        setMetalsWorkers,
        metalsWorkers,
        concreteMultiplier,
        setConcreteMultiplier,
        metalsMultiplier,
        setMetalsMultiplier,
        crystalsMultiplier,
        setCrystalsMultiplier,
        incomeMultiplier,
        setIncomeMultiplier,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayerContext = () => useContext(PlayerContext);
