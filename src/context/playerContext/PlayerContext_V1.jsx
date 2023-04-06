import React, { createContext, useContext, useEffect, useState } from 'react';

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
  // The Game States Definitions
  const [playerContextInitialized, setPlayerContextInitialized] =
    useState(false);
  const [hasPlayerInitialized, setHasPlayerInitialized] = useState(false);

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
  const [thisWeek, setThisWeek] = useState(-1);
  const [lastWeek, setLastWeek] = useState(-1);
  const [energyDelta, setEnergyDelta] = useState(-1);

  //  5. Resources Production (Gathering Rates) Their values are calculated from the workers obtained from the database
  //    5.1,2,3 [type]GathRate: Calculated from the [type]Workers & a multiplier that can be increased from a building in the future
  const [concreteGathRate, setConcreteGathRate] = useState(-1);
  const [metalsGathRate, setMetalsGathRate] = useState(-1);
  const [crystalsGathRate, setCrystalsGathRate] = useState(-1);
  // const [incomeRate, setIncomeRate] = useState(-1);

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
    setThisWeek(0);
    setLastWeek(0);
    setEnergyDelta(0);
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
    setHasPlayerInitialized(true);
  }

  function firstStepInit() {
    setThisWeek(5250);
    setLastWeek(4977);
    setEnergyDelta(thisWeek - lastWeek);
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
    setRequiredEnergy(0); //@Note change this after tutorial!

    // Scores & Ranks
    setRank(calcRank());
    // setFirstStepInitialized(true);
    //Finishing Init
  }

  //@Note: needs data fecthing! For testing I use local json file.
  function initializePlayer() {
    console.log('Initializing player...');

    console.log('1. >>>>>> Pop: ', population);
    console.log('2. >>>>>> Workers Con', concreteWorkers);
    console.log('3. >>>>>> Workers Cry', crystalsWorkers);
    console.log('4. >>>>>> Workers M', metalsWorkers);
    console.log('5. >>>>>> Gold: ', gold);

    setPrivateSector(
      calcAvailCitizens(
        population,
        concreteWorkers,
        crystalsWorkers,
        metalsWorkers
      )
    );

    // Rates
    setConcreteGathRate(calcProduction(concreteWorkers, startingConcreteMulti));
    setMetalsGathRate(calcProduction(metalsWorkers, startingMetalsMulti));
    setCrystalsGathRate(calcProduction(crystalsWorkers, startingCrystalsMulti));
    setPopGrowthRate(Number(livingStadards) / 100);
  }

  function intializeIncome() {
    setIncome(calcIncome(privateSector, startingIncomeMulti));
    console.log('6. >>>>>> Pop Growth Rate', popGrowthRate);

    setHasPlayerInitialized(true);
  }

  function initializePopGrowthRate() {}

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

  useEffect(() => {
    if (
      concreteWorkers !== -1 &&
      crystalsWorkers !== -1 &&
      metalsWorkers !== -1 &&
      population !== -1
    ) {
      initializePlayer();
    }
  }, [concreteWorkers, crystalsWorkers, metalsWorkers, population]);

  useEffect(() => {
    if (privateSector !== -1 && popGrowthRate !== -1) {
      // initializePopGrowthRate();
      intializeIncome();
    }
  }, [privateSector, popGrowthRate]);

  useEffect(() => {
    console.log('Double Checking: Initializing player...');
    console.log(hasPlayerInitialized);

    if (hasPlayerInitialized) {
      setPlayerContextInitialized(true);
    }
  }, [hasPlayerInitialized]);

  return (
    <PlayerContext.Provider
      value={{
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
        setThisWeek,
        thisWeek,
        setLastWeek,
        lastWeek,
        setEnergyDelta,
        energyDelta,
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
