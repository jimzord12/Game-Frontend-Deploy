import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useReducer,
} from 'react';

// import { setLSItem, getLSItem } from './utilityFunction.js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Player } from '@lottiefiles/react-lottie-player';

import { getPlayer, getCards } from '../../../api/apiFns.js';

// import { axiosPrivate } from '../../../api/api.js';
// import axiosPrivate from '../../../api/api.js';
// import useAuth from '../../hooks/useAuth.jsx';
import useAxiosPrivate from '../../hooks/useAxiosPrivate.jsx';

import {
  livingStandardsBase,
  startingHousingSpace,
  startingBuildingsSpace,
  startingGeneratorsSpace,
  startingPop,
  baseMultis,
  NameToImgMapping,
  day,
  minutes,
  effectDuration,
  catchUpLoopDuration,
  gamePace,
  apiEndpointPlayer,
  apiEndpointCards,
} from './constants.js';

import {
  isNewPlayer,
  hasDataInLS,
  calcLivingStandards,
  calcIncome,
  calcPercentage,
  calcPrivSector,
  calcProduction,
  calcRank,
  calcSum,
  calcSpacing,
  calcMultiplier,
  filterCardCategory,
  findCardByTempId,
  findCardById,
  calcUpdatedGathValue,
  cardsStateManager,
} from './helperFunctions.js';

import {
  hoursToSecRates,
  roundToDecimal,
  datesDelta,
  removeObjectWithId,
  calcTimeUnits,
} from './utilityFunctions.js';

import useGameVars from './hooks/useGameVars.jsx';

import { classCard_V2 } from '../../models/Classes/index.js';

import testPlayerData from './testPlayerData.json';
// import testCardData from './testCardData.json';
import testCardData from './testCardData_Empty.json';
import testCardTemplateData from './testCardTemplateData.json';
import { dummyInvCards, dummyCraftCards } from './testCardData.js';

// import { Loading } from '../../pages/index.js';

const PlayerContext = createContext();

export function PlayerContextProvider({ children }) {
  // Hooks section
  const axiosPrivate = useAxiosPrivate();
  const {
    hasUseEffectRun,
    gameLoopTimer,
    gameLoopTickRef,
    inventoryCardsArrRef,
    activeCardsArrRef,
    nonMaterialResourcesRef,
    materialResourcesRef,
    multipliersRef,
    gatheringRatesRef,
    maxLimitsRef,
    energyRef,
    livingStandardsRef,
    townHallLevelRef,
    townHallReqRef,
    workersRef,
    specialEffectsRef,
    maintenanceRef,
  } = useGameVars();

  // Data Holding State
  // 1 - Data to Fetch
  const [playerToFetch, setPlayerToFetch] = useState(null);
  const [cardsToFetch, setCardsToFetch] = useState(null);
  // 2 - Fetched Data
  const [fetchedPlayer, setFetchedPlayer] = useState(null);
  const [fetchedCards, setFetchedCards] = useState(null);
  // 3 - Cards Storage
  const [activeCards, setActiveCards] = useState([]);
  const [inventoryCards, setInventoryCards] = useState([]);
  // const [isSthLoading, setIsSthLoading] = useState(true);

  // The Game States Definitions
  // Initialization Flags, so everything get initialized correctly
  const [testingMode, setTestingMode] = useState(false);
  const [forceRerender, setForceRerender] = useState(false);
  const [cardsInitCompleted, setCardsInitCompleted] = useState(false);
  const [firstInitCompleted, setfirstInitCompleted] = useState(false);
  const [secondInitCompleted, setSecondInitCompleted] = useState(false);
  const [finalInitCompleted, setFinalInitCompleted] = useState(false);
  const [playerContextInitialized, setPlayerContextInitialized] =
    useState(false);
  const [catchUp, setCatchUp] = useState(false);

  // 🧪 BEGIN - TESTING GROUNDS 🧪
  // const [accessTokenExist, setAccessTokenExist] = useState(false);
  const [fakeDate, setFakeDate] = useState(null);

  const [waitForGameLoop, setWaitForGameLoop] = useState(false);
  const testModeInitState = {
    testingMode: false,
    boostMode: false,
    valueChecker: false,
  };

  // Playing with useReducer Hook...
  const [state, dispatch] = useReducer(testingModeReducer, testModeInitState);

  function testingModeReducer(state, action) {
    switch (action.type) {
      case 'toggleboostMode':
        return { ...state, boostMode: !state.boostMode };
      default:
        return state;
    }
  }
  // 🧪 END - TESTING GROUNDS 🧪
  /*
  // 🏹 The Game's Refs 🏹
  // Internal Flags
  const hasUseEffectRun = useRef(false);
  const gameLoopTimer = useRef(null);
  const gameLoopTickRef = useRef(0);

  // Cards Refs
  const inventoryCardsArrRef = useRef([]);
  const activeCardsArrRef = useRef([]);

  // Player's Non-Material Resources (Top-Left Bar)
  const nonMaterialResourcesRef = useRef({
    population: null,
    rank: null,
  });

  // Player's Material Resources (Top-Left Bar)
  const materialResourcesRef = useRef({
    gold: null,
    concrete: null,
    metals: null,
    crystals: null,
  });

  // Multiplier's Used for calculating the produced rates (ex. imcome: privateSector * goldMultiplier)
  const multipliersRef = useRef({
    goldMultiplier: null,
    concreteMultiplier: null,
    metalsMultiplier: null,
    crystalsMultiplier: null,
  });

  // Rates
  const gatheringRatesRef = useRef({
    goldGathRate: null,
    popGrowthRate: null,
    concreteGathRate: null,
    metalsGathRate: null,
    crystalsGathRate: null,
  });

  // Limitations
  //  Space (Increased only by leveling Town Hall Building)
  const maxLimitsRef = useRef({
    housingSpace: null,
    buildingsSpace: null,
    generatorsSpace: null,
  });

  // Energy
  const energyRef = useRef({
    prodEnergy: null,
    requiredEnergy: null,
    delta: null,
  });

  // Living Standards - People Happyness
  // Is used in PopGrowth Rate Calculations
  const livingStandardsRef = useRef(null);

  // TownHall (The Default Building)
  const townHallLevelRef = useRef(null);
  const townHallReqRef = useRef(null);

  // Citizen Management - (Workers and Private Sector)
  const workersRef = useRef({
    privateSector: null,
    concreteWorkers: null,
    metalsWorkers: null,
    crystalsWorkers: null,
  });

  // Holds the active effect from SE Cards
  const specialEffectsRef = useRef({
    isEffectActive: false,
    endDate: 0,
    goldGathRate: 1,
    popGrowthRate: 1,
    concreteGathRate: 1,
    metalsGathRate: 1,
    crystalsGathRate: 1,
  });

  const maintenanceRef = useRef({
    gold: null,
  });
*/
  // 🛒 React - Query Definitions 🛒

  // Queries - Getting Data from Server/DB
  // /*
  useEffect(() => {
    console.log('UseEffect: playerToFetch changed:', playerToFetch);
  }, [playerToFetch]);

  console.log('playerToFetch:', playerToFetch);

  const {
    isLoading: isPlayerLoading,
    isError: isPlayerError,
    error: playerError,
    data,
  } = useQuery({
    queryKey: [apiEndpointPlayer, playerToFetch, axiosPrivate],
    // queryKey: [apiEndpointPlayer, playerToFetch, axiosPrivate],
    queryFn: getPlayer,
    // enabled: false,
    enabled: !!playerToFetch,
    onSuccess: (fetchedData) => {
      setFetchedPlayer(fetchedData);
      console.log('SUCCESSFUL - PLAYER', fetchedData);
    },
  });

  const playerId = data?.id;

  const {
    isLoading: isCardsLoading,
    isError: isCardsError,
    isSuccess: cardsSuccessfullyFetched,
    error: cardsError,
    data: cardsData,
  } = useQuery({
    queryKey: [apiEndpointCards, playerId, axiosPrivate],
    // queryKey: [apiEndpointCards, cardsToFetch, axiosPrivate],
    queryFn: getCards,
    // enabled: false,
    enabled: !!fetchedPlayer,
    onSuccess: (fetchedData) => {
      setFetchedCards(fetchedData);
      console.log('SUCCESSFUL - CARDS', fetchedData);
    },
  });
  // */

  // 👨‍💻 💻 ===== Real Code - Begins from Here ===== 👨‍💻 💻

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
    if (currentLevel === 5)
      return {
        gold: 25000,
        concrete: 10000,
        metals: 4500,
        crystals: 2500,
      };
  }

  // Creating a closure to make this function run only once, without using a var of higher scope
  function boostGathRates4Testing(multiplier) {
    return function () {
      // console.log(
      //   '%c ⚙ YOU ARE IN TESTING MODE!!! ⚙',
      //   'background: #222; color: #bada55; font-size: 16px'
      // );
      console.log(
        '%c ⚙ x100 Multi! ⚙',
        'background: #222; color: #bada55; font-size: 16px'
      );
      console.log('State:: ', state);
      if (state.boostMode) {
        // nonMaterialResourcesRef.current.population *= multiplier / 10;
        //Rates
        console.log(
          '%c ⚙ SUKA SUKA!!! ⚙',
          'background: #222; color: #bada55; font-size: 16px'
        );
        multipliersRef.current.goldMultiplier *= multiplier;
        multipliersRef.current.concreteMultiplier *= multiplier;
        multipliersRef.current.metalsMultiplier *= multiplier;
        multipliersRef.current.crystalsMultiplier *= multiplier;

        gatheringRatesRef.current.popGrowthRate *= multiplier;
        dispatch({ type: 'toggleboostMode' });
        console.log('After - State:: ', state);

        // gatheringRatesRef.current.goldGathRate *= multiplier;
        // gatheringRatesRef.current.concreteGathRate *= multiplier;
        // gatheringRatesRef.current.metalsGathRate *= multiplier;
        // gatheringRatesRef.current.crystalsGathRate *= multiplier;
      }
    };
  }

  // Can also be used as a noob Anti-Cheat mechanism
  // Checks each game loop for the following:
  // 1. If Population has reached its maximum limit (Housing)
  // 2. If the total Workers are greater than the total Population
  // 3. If there is sufficient energy for the buildings
  // 4. If Techstore's tools levels are greater than the building's level
  // 5. If a Special Effect Card is active
  //  - 5.1 If it is, checks if the effect has expired
  function valueChecker(_loopCounter, isSecondRun = false) {
    if (testingMode) {
      console.log(
        '%c ⚙ YOU ARE IN TESTING MODE!!! ⚙',
        'background: #222; color: #bada55; font-size: 16px'
      );
      console.log(
        '%c ⚙ No Value Checking is Performed! ⚙',
        'background: #222; color: #bada55; font-size: 16px'
      );
      return;
    }

    // Caching some values...
    const population = nonMaterialResourcesRef.current.population;
    const techStoresCards = activeCards.filter(
      (card) => card.templateId === 13
    );
    const EffectRef = specialEffectsRef.current;
    const spaceLimitsRef = maxLimitsRef.current;
    const buildings = activeCards.filter((card) => card.type === 'Building');
    const regs = activeCards.filter((card) => card.type === 'REG');
    const totalWorkers =
      workersRef.current.concreteWorkers +
      workersRef.current.metalsWorkers +
      workersRef.current.crystalsWorkers;

    console.log('REGs - GGGGGGGG: ', regs);
    console.log('Buildings - GGGGGGGG: ', buildings);

    // Check #1 - When Population reached the max limit, stop popGrowth
    if (population > spaceLimitsRef.housingSpace) {
      console.log(
        '%c ⚙ Value Checker - Adjusted (Population) ⚙',
        'background: #222; color: #bada55; font-size: 16px'
      );
      nonMaterialResourcesRef.current.population = spaceLimitsRef.housingSpace;
      gatheringRatesRef.current.popGrowthRate = 0;
    }

    // Check #2 - Available Pop & Workers Checker
    if (totalWorkers > population) {
      console.log(
        '%c ⚙ Value Checker - Adjusted (Workers) ⚙',
        'background: #222; color: #bada55; font-size: 16px'
      );
      workersRef.current = {
        privateSector: population,
        concreteWorkers: 0,
        metalsWorkers: 0,
        crystalsWorkers: 0,
      };
    }

    // Check #3 - Sufficient Energy Checker
    if (energyRef.current.delta < 0) {
      const buildingCards = activeCards.filter(
        (card) => card.type === 'Building'
      );
      console.log('1 - DDDFFF: ', buildingCards);
      const regCards = activeCards.filter((card) => card.type === 'REG');
      console.log('2 - DDDFFF: ', regCards);
      console.log('3 - DDDFFF: ', activeCards);
      console.log('4 - DDDFFF: ', inventoryCards);

      setActiveCards([...regCards]);
      setInventoryCards((prev) => [...prev, ...buildingCards]);
    }

    // Check #4 - Check that TechStore's Tools are not above the Card's level
    techStoresCards.forEach((techStore) => {
      const tools = techStore.stats;
      for (const tool in tools) {
        if (Object.hasOwnProperty.call(tools, tool)) {
          const tool_lvl = tools[tool];
          if (tool_lvl > techStore.level) {
            console.log(
              '%c ⚙ Value Checker - Adjusted (Tools in TechStore) ⚙',
              'background: #222; color: #bada55; font-size: 16px'
            );
            tools[tool] = techStore.level;
          }
        }
      }
    });

    // Check #5 - if the Special Effect has finished
    if (
      EffectRef.isEffectActive && // if Effect is active AND
      // Returns false when the Effect expires
      !datesDelta(EffectRef.endDate + effectDuration, Date.now())
    ) {
      specialEffectsRef.current = {
        isEffectActive: false,
        endDate: 0,
        goldGathRate: 1,
        popGrowthRate: 1,
        concreteGathRate: 1,
        metalsGathRate: 1,
        crystalsGathRate: 1,
      };
      const [SE_Card] = filterCardCategory(activeCards, 'Special Effect'); // There should be only one.
      SE_Card.disable();
      setActiveCards([...removeObjectWithId(activeCards, SE_Card.id)]);
      setInventoryCards((prev) => [...prev, SE_Card]);
      alert('⏳ Your Special Effect Card expired!');
    }

    // Check #6 - if The active cards exceed the maximum Space Limits
    if (
      (!isSecondRun && regs.length > spaceLimitsRef.generatorsSpace) ||
      buildings.length > spaceLimitsRef.buildingsSpace
    ) {
      if (regs.length > spaceLimitsRef.generatorsSpace) {
        cardsStateManager(activeCards, 'deactivate');
        setInventoryCards((prev) => [...prev, ...activeCards]);
        setActiveCards([]);
      } else if (buildings.length > spaceLimitsRef.buildingsSpace) {
        cardsStateManager(buildings, 'deactivate');
        setActiveCards([...regs]);
        setInventoryCards((prev) => [...prev, ...buildings]);
      }
    }
  }

  //@Note: At this point, the maintenance looks at a hour time precision
  //@Note: This should change to the game loop's time precision
  // 1. Checks if there are any Generators Active
  //  - 1.2 If there are, calc total maintenance (in Gold) and check
  //        if the player has enough to pay
  //    - 1.2.1 If he/she has enough, subtract the Gold and do nothing else.
  //    - 1.2.2 If he/she does NOT has enough, remove all active cards & insert them to the Inventory.
  function maintenanceSubtracker() {
    const regCards = activeCards.filter(
      (card) => card.type.toLowerCase() === 'reg'
    );
    console.log('🏭💸 Total Costs (/hour): ', maintenanceRef.current.gold);

    // If there are not any REG Cards don't waste processing power
    if (regCards.length === 0) {
      maintenanceRef.current.gold = 0;
      return;
    }
    const playerGold = materialResourcesRef.current.gold;
    const totalMaintenanceGold = regCards.reduce((acc, card) => {
      return acc + card.maintenance.gold;
    }, 0);

    maintenanceRef.current.gold = roundToDecimal(totalMaintenanceGold, 4); // Update global state

    if (totalMaintenanceGold > playerGold) {
      // setActiveCards((prev) => prev.filter((card) => !regCards.includes(card)));
      // setInventoryCards((prev) => [...prev, ...regCards]);
      setInventoryCards((prev) => [...prev, ...activeCards]);
      setActiveCards([]);
      alert(
        `😱 Your current Gold is not enough to pay for the maintenance of your Generators! Therefore, your Generators will be deactivated.`
      );
    } else {
      console.log('======== Maintenance ========');
      console.log('🏭💸 Generators: ', regCards);
      console.log('🏭💸 Total Costs (/hour): ', totalMaintenanceGold);
      console.log(
        '🏭💸 Total Costs (/5sec): ',
        hoursToSecRates(totalMaintenanceGold, gamePace)
      );
      console.log('🏭💸 Old Balance: ', materialResourcesRef.current.gold);

      //@Important: This Line subtracts gold from the resources
      materialResourcesRef.current.gold -= hoursToSecRates(
        totalMaintenanceGold,
        gamePace,
        catchUp
      );
      console.log('🏭💸 New Balance: ', materialResourcesRef.current.gold);
      console.log('======== ======== ========');
    }
  }

  function gameLoop(isCatchUp = false, _loopCounter) {
    console.log('♦♥♦♥ 🕕 $$ Start of Loop $$ 🕕 ♦♥♦♥');

    valueChecker(_loopCounter);
    const isSecondRun = true; // Needed in 2nd ValueChecker in the end of the gameLoop func
    if (testingMode) {
      boostGathRates4Testing(100)();
    }

    // Some console logs to monitor the game loop variables
    // {
    //   const a = nonMaterialResourcesRef.current.population;
    //   const b = materialResourcesRef.current.gold;
    //   const c = materialResourcesRef.current.concrete;
    //   const d = materialResourcesRef.current.metals;
    //   const e = materialResourcesRef.current.crystals;
    //   const f = workersRef.current.privateSector;
    //   const g = workersRef.current.concreteWorkers;
    //   const i = workersRef.current.metalsWorkers;
    //   const h = workersRef.current.crystalsWorkers;
    //   const k = energyRef.current.prodEnergy;
    //   console.clear();
    //   console.log('🤢 Old Pop: ', a);
    //   console.log('🤢 Old Gold: ', b);
    //   console.log('🤢 Old Concrete: ', c);
    //   console.log('🤢 Old Metals: ', d);
    //   console.log('🤢 Old Crystals: ', e);
    //   console.log('🤢 Old PrivateSector: ', f);
    //   console.log('🤢 Old Workers Concrete: ', g);
    //   console.log('🤢 Old Workers Metals: ', i);
    //   console.log('🤢 Old Workers Crystals: ', h);
    //   console.log('🤢 Old Energy Prod: ', k);
    //   console.log(
    //     '♦♥♦♥ $$ Pop Growth $$: ',
    //     gatheringRatesRef.current.popGrowthRate
    //   );
    // }
    console.log('♦♥♦♥ 🧪 Testing Mode 🧪: ', testingMode);
    console.log('♦♥♦♥ $$ Active Cards $$: ', activeCards);
    console.log('♦♥♦♥ $$ Inventory Cards Amount $$: ', inventoryCards);
    console.log('======== Gath Rates ========');
    console.log('💰 1 - Gath Gold: ', gatheringRatesRef.current.goldGathRate);
    console.log('👨‍🔧 2 - Gath Pop: ', gatheringRatesRef.current.popGrowthRate);
    console.log(
      '🧱 3 - Gath Concrete: ',
      gatheringRatesRef.current.concreteGathRate
    );
    console.log(
      '⚙  4 - Gath Metals: ',
      gatheringRatesRef.current.metalsGathRate
    );
    console.log(
      '🔍 5 - Gath Crystals: ',
      gatheringRatesRef.current.crystalsGathRate
    );

    // Resources
    // - Non Material
    //   - Population
    nonMaterialResourcesRef.current.population = roundToDecimal(
      calcUpdatedGathValue(
        nonMaterialResourcesRef.current.population,
        hoursToSecRates(
          gatheringRatesRef.current.popGrowthRate,
          gamePace,
          catchUp
        )
      ),
      4
    );

    // - Material
    //   - Gold
    materialResourcesRef.current.gold = roundToDecimal(
      calcUpdatedGathValue(
        materialResourcesRef.current.gold,
        hoursToSecRates(
          gatheringRatesRef.current.goldGathRate,
          gamePace,
          catchUp
        )
      ),
      4
    );
    //   - Concrete
    materialResourcesRef.current.concrete = roundToDecimal(
      calcUpdatedGathValue(
        materialResourcesRef.current.concrete,
        hoursToSecRates(
          gatheringRatesRef.current.concreteGathRate,
          gamePace,
          catchUp
        )
      ),
      4
    );
    //   - Metals
    materialResourcesRef.current.metals = roundToDecimal(
      calcUpdatedGathValue(
        materialResourcesRef.current.metals,
        hoursToSecRates(
          gatheringRatesRef.current.metalsGathRate,
          gamePace,
          catchUp
        )
      ),
      4
    );
    //   - Crystals
    materialResourcesRef.current.crystals = roundToDecimal(
      calcUpdatedGathValue(
        materialResourcesRef.current.crystals,
        hoursToSecRates(
          gatheringRatesRef.current.crystalsGathRate,
          gamePace,
          catchUp
        )
      ),
      4
    );

    // Spacing Limitations
    maxLimitsRef.current.housingSpace = calcSpacing(
      townHallLevelRef.current,
      'housing'
    );
    maxLimitsRef.current.buildingsSpace = calcSpacing(
      townHallLevelRef.current,
      'buildings'
    );
    maxLimitsRef.current.generatorsSpace = calcSpacing(
      townHallLevelRef.current,
      'generators'
    );

    // Energy
    energyRef.current.prodEnergy = calcSum(
      filterCardCategory(activeCards, 'reg'),
      'output',
      'energy'
    );
    energyRef.current.requiredEnergy = calcSum(
      filterCardCategory(activeCards, 'building'),
      'maintenance',
      'energy'
    );
    energyRef.current.delta =
      energyRef.current.prodEnergy - energyRef.current.requiredEnergy;

    // Rank
    nonMaterialResourcesRef.current.rank = calcRank(
      nonMaterialResourcesRef.current.population,
      energyRef.current.prodEnergy
    );

    // Living Standards
    livingStandardsRef.current = roundToDecimal(
      calcLivingStandards(
        livingStandardsBase,
        nonMaterialResourcesRef.current.population,
        //@Note: Add the Cards which play a factor (give a bonus) in the array
        calcSum([], 'output'),
        maxLimitsRef.current.housingSpace
      ),
      4
    );

    // Multipliers
    const techStoresCards = activeCards.filter(
      (card) => card.templateId === 13
    );
    multipliersRef.current.goldMultiplier = roundToDecimal(
      calcMultiplier(techStoresCards, 'gold', baseMultis.baseGoldMulti),
      4
    );
    multipliersRef.current.concreteMultiplier =
      multipliersRef.current.concreteMultiplier = roundToDecimal(
        calcMultiplier(
          techStoresCards,
          'concrete',
          baseMultis.baseConcreteMulti
        ),
        4
      );
    multipliersRef.current.metalsMultiplier =
      multipliersRef.current.metalsMultiplier = roundToDecimal(
        calcMultiplier(techStoresCards, 'metals', baseMultis.baseMetalsMulti),
        4
      );
    multipliersRef.current.crystalsMultiplier =
      multipliersRef.current.crystalsMultiplier = roundToDecimal(
        calcMultiplier(
          techStoresCards,
          'crystals',
          baseMultis.baseCrystalsMulti
        ),
        4
      );

    // Rates
    // - Pop Growth
    gatheringRatesRef.current.popGrowthRate =
      roundToDecimal(Number(livingStandardsRef.current) / 100, 4) *
      specialEffectsRef.current.popGrowthRate;

    // - Gold Gather Rate
    gatheringRatesRef.current.goldGathRate =
      roundToDecimal(
        calcProduction(
          workersRef.current.privateSector,
          multipliersRef.current.goldMultiplier
        ),
        4
      ) * specialEffectsRef.current.goldGathRate;

    // - Concrete Gather Rate
    gatheringRatesRef.current.concreteGathRate =
      roundToDecimal(
        calcProduction(
          workersRef.current.concreteWorkers,
          multipliersRef.current.concreteMultiplier
        ),
        4
      ) * specialEffectsRef.current.concreteGathRate;

    // - Metals Gather Rate
    gatheringRatesRef.current.metalsGathRate =
      roundToDecimal(
        calcProduction(
          workersRef.current.metalsWorkers,
          multipliersRef.current.metalsMultiplier
        ),
        4
      ) * specialEffectsRef.current.metalsGathRate;

    // - Crystals Gather Rate
    gatheringRatesRef.current.crystalsGathRate =
      roundToDecimal(
        calcProduction(
          workersRef.current.crystalsWorkers,
          multipliersRef.current.crystalsMultiplier
        ),
        4
      ) * specialEffectsRef.current.crystalsGathRate;

    if (specialEffectsRef.current.isEffectActive) {
      console.log('======== Effect Boosts ========');
      console.log(
        'Is any Effect Active: ',
        specialEffectsRef.current.isEffectActive
      );
      console.log(
        'Expires In (ms): ',
        specialEffectsRef.current.endDate + effectDuration
      );
      console.log(
        'Expires In (date): ',
        new Date(specialEffectsRef.current.endDate + effectDuration)
      );
      console.log(
        '1 - Concrete: ',
        roundToDecimal(specialEffectsRef.current.concreteGathRate - 1, 4)
      );
      console.log(
        '2 - Metals: ',
        roundToDecimal(specialEffectsRef.current.metalsGathRate - 1, 4)
      );
      console.log(
        '3 - Crystals: ',
        roundToDecimal(specialEffectsRef.current.crystalsGathRate - 1, 4)
      );
    }

    // Workers
    // - Private Sector
    workersRef.current.privateSector = roundToDecimal(
      calcPrivSector(
        nonMaterialResourcesRef.current.population,
        workersRef.current.concreteWorkers,
        workersRef.current.metalsWorkers,
        workersRef.current.crystalsWorkers
      ),
      4
    );

    valueChecker(_loopCounter, isSecondRun); // The anti-cheat system 🤣
    maintenanceSubtracker();

    console.log('♦♥♦♥ 🕕 $$ End of Loop $$ 🕕 ♦♥♦♥');

    // Console Logs Inside {...}
    // {
    //   console.log(
    //     '👨‍🚀 Pop Growth (/h): ',
    //     gatheringRatesRef.current.popGrowthRate
    //   );
    //   console.log(
    //     '👨‍🚀 Pop Growth (/gamePace): ',
    //     hoursToSecRates(gatheringRatesRef.current.popGrowthRate, gamePace)
    //   );

    //   console.log('🏆 New Pop: ', nonMaterialResourcesRef.current.population);
    //   console.log('🏆 New Gold: ', materialResourcesRef.current.gold);
    //   console.log('🏆 New Concrete: ', materialResourcesRef.current.concrete);
    //   console.log('🏆 New Metals: ', materialResourcesRef.current.metals);
    //   console.log('🏆 New Crystals: ', materialResourcesRef.current.crystals);
    //   console.log('🏆 New PrivateSector: ', workersRef.current.privateSector);
    //   console.log(
    //     '📈 Delta Pop: ',
    //     roundToDecimal(nonMaterialResourcesRef.current.population - a, 4)
    //   );
    //   console.log(
    //     '📈 Delta Gold: ',
    //     roundToDecimal(materialResourcesRef.current.gold - b, 4)
    //   );
    //   console.log(
    //     '📈 Delta Concrete: ',
    //     roundToDecimal(materialResourcesRef.current.concrete - c, 4)
    //   );
    //   console.log(
    //     '📈 Delta Metals: ',
    //     roundToDecimal(materialResourcesRef.current.metals - d, 4)
    //   );
    //   console.log(
    //     '📈 Delta Crystals: ',
    //     roundToDecimal(materialResourcesRef.current.crystals - e, 4)
    //   );
    //   console.log(
    //     '📈 Delta PrivateSector: ',
    //     roundToDecimal(workersRef.current.privateSector - f, 4)
    //   );
    //   console.log('                                                          ');
    //   console.log('📣📣📣📣📣📣📣📣📣📣📣📣📣📣📣📣📣📣📣📣📣📣📣📣📣📣');
    // }
  }

  // Scoped helper functions
  function initializeNewPlayer() {
    // Statistics
    // @Note: Therotically this should not be 0, when the tutorial is ready, change it
    // @Note: Just create the required code for them some time,future me 😅, ♥ yeah..
    // This one is good!
    // setLivingStadards(livingStandardsBase);
    // // Citizens Management
    // setConcreteWorkers(0);
    // setCrystalsWorkers(0);
    // setMetalsWorkers(0);
    // setPrivateSector(
    //   population
    //   // calcPrivSector(
    //   //   population,
    //   //   concreteWorkers,
    //   //   crystalsWorkers,
    //   //   metalsWorkers
    //   // )
    // );
    // // Resources
    // setGold(0);
    // setPopulation(startingPop);
    // setEnergy(0);
    // setConcrete(0);
    // setMetals(0);
    // setCrystals(0);
    // // Rates
    // setIncome(calcIncome(privateSector, startingIncomeMulti)); //Gold
    // setConcreteGathRate(startingConcreteMulti);
    // setMetalsGathRate(startingMetalsMulti);
    // setCrystalsGathRate(startingCrystalsMulti);
    // setPopGrowthRate(Number(livingStadards) / 100);
    // // Limitations
    // setHousingSpace(startingHousingSpace);
    // setBuildingsSpace(startingBuildingsSpace);
    // setGeneratorsSpace(startingGeneratorsSpace);
    // setRequiredEnergy(0);
    // // Scores & Ranks
    // setRank(calcRank());
    // // setHasPlayerInitialized(true);
  }

  /**
   * - Explaining The Initialization Technic -
   * Most of React's Hooks and provided functions are async to boost performance.
   * This becomes a big problem when you start using Non-async functions that depend on React's async features.
   * To work around this, I have created some initialization steps that use flags to fix the order of the function execution.
   * The correct utilization of the useEffect hook is vital, you must know how the dependency array works and when it must be empty or check for flag changes
   */
  function cardsInit() {
    console.log('======== Initializing Cards ========');
    const activeCardsArr = [];
    const inventoryCardsArr = [];

    // cardsData.forEach((card, index) => {
    fetchedCards.forEach((card, index) => {
      console.log(`(${index + 1}) Card ===> `, card);
      const jsCard = new classCard_V2(
        card,
        testCardTemplateData[card.templateId]
      );
      jsCard.image = NameToImgMapping[jsCard.img];
      card.state ? activeCardsArr.push(jsCard) : inventoryCardsArr.push(jsCard);
    });

    // For some reason that the current Me can not recall, I calculate the cards' maintenance here 😅
    maintenanceRef.current.gold = roundToDecimal(
      activeCardsArr
        .filter((card) => card.type.toLowerCase() === 'reg')
        .reduce((acc, card) => {
          return acc + card.maintenance.gold;
        }, 0),
      4
    );
    console.log('CardInit: Active Cards : ', activeCardsArr);
    console.log('CardInit: Inventory Cards : ', inventoryCardsArr);
    console.log('CardInit: Maintenance : ', maintenanceRef.current.gold);

    console.log('======== ======== ========');

    return { activeCardsArr, inventoryCardsArr };
  }

  function firstStepInit() {
    console.log('(1) - Initializing 1st Step...');
    console.log('1st Step => Active Card: ', activeCards);
    // Town Hall
    townHallLevelRef.current = testPlayerData.townHallLevel;
    // Resources
    //   Non-Material
    nonMaterialResourcesRef.current.population =
      testPlayerData.resources.population;
    // @NOTE: Its not completed! Just returns a random number

    //   Material
    materialResourcesRef.current.gold = testPlayerData.resources.gold;
    materialResourcesRef.current.concrete = testPlayerData.resources.concrete;
    materialResourcesRef.current.metals = testPlayerData.resources.metals;
    materialResourcesRef.current.crystals = testPlayerData.resources.crystals;

    // Citizens Management - Workers
    workersRef.current.concreteWorkers = testPlayerData.workers.concrete;
    workersRef.current.metalsWorkers = testPlayerData.workers.metals;
    workersRef.current.crystalsWorkers = testPlayerData.workers.crystals;

    // Multipliers - Needs data from Techstore Card
    // Arg #2: templateId for Techstore Card
    //@Note: If there can be multiple TechStore cards we need to find it through ID search.
    // const techStoreCard = findCardByTempId(activeCards, 13);
    // Get all active TechStore cards
    const techStoresCards = activeCards.filter(
      (card) => card.templateId === 13
    );
    multipliersRef.current.goldMultiplier = roundToDecimal(
      calcMultiplier(techStoresCards, 'gold', baseMultis.baseGoldMulti),
      4
    );
    multipliersRef.current.concreteMultiplier = roundToDecimal(
      calcMultiplier(techStoresCards, 'concrete', baseMultis.baseConcreteMulti),
      4
    );
    multipliersRef.current.metalsMultiplier = roundToDecimal(
      calcMultiplier(techStoresCards, 'metals', baseMultis.baseMetalsMulti),
      4
    );
    multipliersRef.current.crystalsMultiplier = roundToDecimal(
      calcMultiplier(techStoresCards, 'crystals', baseMultis.baseCrystalsMulti),
      4
    );

    setfirstInitCompleted(true);
    console.log('The End of 1st Step...');
    console.log('#############################################');
  }

  //@Note: needs data fecthing! For testing I use local json file.
  function secondStepInit() {
    {
      console.log('(2) - Initializing 2nd Step...');
      console.log('Below are the Values that were Initialized in Step (1)...');

      console.log('======== Non-Material ========');
      console.log('1. >> Pop: ', nonMaterialResourcesRef.current.population);
      // console.log('2. >> Energy: ', nonMaterialResourcesRef.current.energy);
      console.log('2. >> Rank: ', nonMaterialResourcesRef.current.rank);
      console.log('======== Material ========');
      console.log('3. >> Gold: ', materialResourcesRef.current.gold);
      console.log('4. >> Concrete: ', materialResourcesRef.current.concrete);
      console.log('5. >> metals: ', materialResourcesRef.current.metals);
      console.log('6. >> crystals: ', materialResourcesRef.current.crystals);
      console.log('======== Multiplier ========');
      console.log('7. >> Gold Multi: ', multipliersRef.current.goldMultiplier);
      console.log(
        '8. >> Concrete Multi: ',
        multipliersRef.current.concreteMultiplier
      );
      console.log(
        '9. >> Metals Multi: ',
        multipliersRef.current.metalsMultiplier
      );
      console.log(
        '10. >> Crystals Multi: ',
        multipliersRef.current.crystalsMultiplier
      );
      console.log('#############################################');
    }

    // TownHall Reqs
    townHallReqRef.current = justTH_LevelUp_Req(townHallLevelRef.current);

    // Spacing Limitations
    maxLimitsRef.current.housingSpace = calcSpacing(
      townHallLevelRef.current,
      'housing'
    );
    maxLimitsRef.current.buildingsSpace = calcSpacing(
      townHallLevelRef.current,
      'buildings'
    );
    maxLimitsRef.current.generatorsSpace = calcSpacing(
      townHallLevelRef.current,
      'generators'
    );

    livingStandardsRef.current = calcLivingStandards(
      livingStandardsBase,
      nonMaterialResourcesRef.current.population,
      //@Note: Add the Cards which play a factor (give a bonus) in the array
      calcSum([], 'output'),
      maxLimitsRef.current.housingSpace
    );

    // Give an Array of all the active REG Cards as argument
    energyRef.current.prodEnergy = calcSum(
      filterCardCategory(activeCards, 'reg'),
      'output',
      'energy'
    );
    energyRef.current.requiredEnergy = calcSum(
      filterCardCategory(activeCards, 'building'),
      'maintenance',
      'energy'
    );

    workersRef.current.privateSector = calcPrivSector(
      nonMaterialResourcesRef.current.population,
      workersRef.current.concreteWorkers,
      workersRef.current.metalsWorkers,
      workersRef.current.crystalsWorkers
    );

    // setRequiredEnergy(0); //@Note change this after tutorial!

    // Rates
    gatheringRatesRef.current.popGrowthRate =
      Number(livingStandardsRef.current) / 100;

    gatheringRatesRef.current.concreteGathRate = calcProduction(
      workersRef.current.concreteWorkers,
      multipliersRef.current.concreteMultiplier
    );
    gatheringRatesRef.current.metalsGathRate = calcProduction(
      workersRef.current.metalsWorkers,
      multipliersRef.current.metalsMultiplier
    );
    gatheringRatesRef.current.crystalsGathRate = calcProduction(
      workersRef.current.crystalsWorkers,
      multipliersRef.current.crystalsMultiplier
    );

    setSecondInitCompleted(true);
  }

  // function thirdStepInit() {
  //   setThirdInitCompleted(true);
  // }

  function finalStepInit() {
    nonMaterialResourcesRef.current.rank = calcRank(
      nonMaterialResourcesRef.current.population,
      energyRef.current.prodEnergy
    );

    energyRef.current.delta =
      energyRef.current.prodEnergy - energyRef.current.requiredEnergy;

    gatheringRatesRef.current.goldGathRate = calcProduction(
      workersRef.current.privateSector,
      multipliersRef.current.goldMultiplier
    );

    {
      console.log('(3) - Initializing Final Step...');
      console.log('Below are the Values that were Initialized in Step (2)...');

      console.log('======== Spacing Limits ========');
      console.log('11. >> Housing: ', maxLimitsRef.current.housingSpace);
      console.log(
        '12. >> Buildings Space: ',
        maxLimitsRef.current.buildingsSpace
      );
      console.log(
        '13. >> Generators Spave: ',
        maxLimitsRef.current.generatorsSpace
      );
      console.log('======== Energy ========');
      console.log('14. >> Production', energyRef.current.prodEnergy);
      console.log('15. >> Consumed', energyRef.current.requiredEnergy);
      console.log('16. >> Left', energyRef.current.delta);
      console.log('======== Living Standards ========');
      console.log('17. >> Current Value', livingStandardsRef.current);
      console.log('======== Workers ========');
      console.log(
        '18. >> Workers Concrete',
        workersRef.current.concreteWorkers
      );
      console.log('19. >> Workers Metals', workersRef.current.metalsWorkers);
      console.log(
        '20. >> Workers Crystals',
        workersRef.current.crystalsWorkers
      );
      console.log('21. >> Private Sector: ', workersRef.current.privateSector);
      console.log('======== Gathering Rates ========');
      console.log(
        '22. >> Concrete Gathering Rate: ',
        gatheringRatesRef.current.concreteGathRate
      );
      console.log(
        '23. >> Metals Gathering Rate: ',
        gatheringRatesRef.current.metalsGathRate
      );
      console.log(
        '24. >> Crystals Gathering Rate: ',
        gatheringRatesRef.current.crystalsGathRate
      );
      console.log(
        '25. >> Population Growth Rate: ',
        gatheringRatesRef.current.popGrowthRate
      );
      console.log('#############################################');
    }
    // setIncome(calcIncome(privateSector, startingIncomeMulti));
    // incomeRef.current = income;
    // privateSecRef.current = privateSector;
    setFinalInitCompleted(true);
  }

  // > Initianlization UseEffects <
  // 1. Check if the player is New or Old, and if init him/her
  // 2. If Old, use the fetched JSON to create the player's Cards
  // 3. This useEffect is the Entry Point

  useEffect(() => {
    /*
    if (!isPlayerLoading && !isCardsLoading) {
      console.log('**********************************');
      console.log(' -- THE FETCHED DATA --');
      console.log('**********************************');
      console.log('Player Data: ', playerData);
      console.log('Cards Data: ', cardsData);
      console.log('**********************************');
*/
    // console.log('From useEffect::PlayerContext: ', accessToken);

    console.log(
      '1 --From useEffect::PlayerContext::cardsSuccessfullyFetched: ',
      cardsSuccessfullyFetched
    );
    if (cardsSuccessfullyFetched && fetchedCards) {
      console.log(
        '2 -- From useEffect::PlayerContext::Fetched Cards: ',
        fetchedCards
      );
      console.log(
        '3 -- From useEffect::PlayerContext::Fetched Player: ',
        fetchedPlayer
      );
      if (!hasUseEffectRun.current) {
        if (isNewPlayer(testPlayerData.playerId)) {
          console.log(
            'New Player 😁 Detected! Player ID: ',
            testPlayerData.playerId
          );
          initializeNewPlayer();
        } else {
          console.log('Old Player 😎 Detected!');
          console.log('Player ID: ', testPlayerData.playerId);
          console.log('Player Name: ', testPlayerData.name);

          // 1. From the player's ID we fecth the corresponding Cards
          // 2. We need to convert the JSON data into JS Class objects/instances
          const { activeCardsArr, inventoryCardsArr } = cardsInit();
          // 3. After that, we simply store them in User's device memory
          activeCardsArrRef.current = activeCardsArr;
          inventoryCardsArrRef.current = inventoryCardsArr;
          setActiveCards([...activeCardsArr]);
          setInventoryCards([...inventoryCardsArr]);
          setCardsInitCompleted(true);
          hasUseEffectRun.current = true; // Ensures that cards are initialized once and not twice
          // setIsSthLoading(false);
        }
      } else {
      }
    }
  }, [
    /*isPlayerLoading, isCardsLoading, */
    cardsSuccessfullyFetched,
    fetchedCards,
  ]);
  // Starts 1st Init Step
  useEffect(() => {
    if (cardsInitCompleted) {
      console.log('-- Inside useEffect of Step 1 Init --');
      console.log('>% Active Cards Ref: ', activeCardsArrRef.current);
      console.log('>% Inventory Cards Ref: ', inventoryCardsArrRef.current);
      firstStepInit();
    }
  }, [cardsInitCompleted]);

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
    if (firstInitCompleted && secondInitCompleted && finalInitCompleted) {
      {
        console.log('(4) - Initializing final Step...');
        console.log(
          'Below are the Values that were Initialized in Step (3)...'
        );

        console.log(
          '1. >> Gold Gath Rate: ',
          gatheringRatesRef.current.goldGathRate
        );
        console.log('1. >> Energy Left (Delta): ', energyRef.current.delta);
        console.log('Has First Step Init Completed: ', firstInitCompleted);
        console.log('Has Second Step Init Completed: ', secondInitCompleted);
        console.log('Has Final Step Init Completed: ', finalInitCompleted);
        console.log(
          'Has the Initialization Process Completed: ',
          firstInitCompleted && secondInitCompleted && finalInitCompleted
        );

        console.log('#############################################');
        setPlayerContextInitialized(true);
      }
      //@Note - Important: Turn this off for production!
    }
  }, [firstInitCompleted, secondInitCompleted, finalInitCompleted]);

  useEffect(() => {
    if (playerContextInitialized) {
      // If there is a need to run the "Catch Up" Simulation
      if (catchUp) {
        //@Future: This is 10mins in milisecs, however I generalized it into a utility function. The reason being that in the future it could be dynamically calculated
        const catchUpTimeUnits = calcTimeUnits(
          testPlayerData.timestamp,
          Date.now(),
          catchUpLoopDuration
        );
        let loopCoutner = 1;
        for (let timeUnits = 0; timeUnits < catchUpTimeUnits; timeUnits++) {
          // for (let timeUnits = 0; timeUnits < 100; timeUnits++) {
          gameLoop(catchUp, loopCoutner);
          loopCoutner++;
          console.log('🎢 🚀 Catching Up! 🎢 🚀');
          console.log(`🎢 🚀 Current Loop: (${loopCoutner}) 🎢 🚀`);
        }
        setCatchUp(false);
      }
      // Forcing Game Loop to run when cards are used
      console.log('✅ ⚡ Manual Loop Run! ✅ ⚡');
      gameLoopTickRef.current += 1;
      gameLoop();
      setWaitForGameLoop((prev) => !prev);

      // const { activeCardsArr, inventoryCardsArr } = cardsInit();
      // activeCardsArrRef.current = activeCardsArr;
      // inventoryCardsArrRef.current = inventoryCardsArr;
      // setActiveCards([...activeCardsArr]);
      // setInventoryCards([...inventoryCardsArr]);

      // Set up the timer when the component mounts
      gameLoopTimer.current = setInterval(() => {
        gameLoopTickRef.current += 1;
        console.log('Game Loop Tick: ', gameLoopTickRef.current);
        gameLoop();
      }, gamePace * 1000);

      return () => {
        clearInterval(gameLoopTimer.current);
        console.log('Clearing Timer...');
      }; // Cleanup on unmount
    }
  }, [
    playerContextInitialized,
    activeCards,
    inventoryCards,
    testingMode,
    state.boostMode,
    forceRerender,
    catchUp,
  ]);

  // useEffect(() => {}, [hasGameLoopFinished]);

  useEffect(() => {
    if (playerContextInitialized) {
      // setForceRerender((prev) => !prev);
      console.log('📣 Re-render Forcer: ActiveCards: ', activeCards);
      console.log('📣 Re-render Forcer: InventoryCards: ', inventoryCards);
      console.log(' 📣 Forcing Re-rendering... 📣 ');
      // setActiveCards(activeCardsArrRef.current);
      // setInventoryCards(inventoryCardsArrRef.current);
    }
  }, [forceRerender]);

  // > Updating Values useEffects <
  // Town Hall Level
  // useEffect(() => {
  //   maxLimitsRef.current.housingSpace = calcSpacing(
  //     townHallLevelRef.current,
  //     'housing'
  //   );
  //   maxLimitsRef.current.buildingsSpace = calcSpacing(
  //     townHallLevelRef.current,
  //     'buildings'
  //   );
  //   maxLimitsRef.current.generatorsSpace = calcSpacing(
  //     townHallLevelRef.current,
  //     'generators'
  //   );

  //   console.log(' New Limits 1: ', maxLimitsRef.current.housingSpace);
  //   console.log(' New Limits 2: ', maxLimitsRef.current.buildingsSpace);
  //   console.log(' New Limits 3: ', maxLimitsRef.current.generatorsSpace);
  // }, [townHallLevelRef.current]);

  return (
    <PlayerContext.Provider
      value={{
        playerContextInitialized, // Purpose: Components that use the player context will wait until it is firstly initialized, without this unexpected things happen
        townHallLevelRef,
        townHallReqRef,
        nonMaterialResourcesRef,
        materialResourcesRef,
        multipliersRef,
        gatheringRatesRef,
        maxLimitsRef,
        energyRef,
        livingStandardsRef,
        workersRef,
        gamePace,
        activeCards,
        setActiveCards,
        inventoryCards,
        setInventoryCards,
        testCardTemplateData,
        setForceRerender,
        waitForGameLoop,
        specialEffectsRef,
        testingMode,
        setTestingMode,
        dispatch,
        maintenanceRef,
        baseMultis,
        effectDuration,
        setCatchUp,
        catchUp,
        fakeDate,
        setFakeDate,
        setPlayerToFetch,
        // forceRerenderChild,
        // animationTrackingRef,
      }}
    >
      {children}
      {/* {cardsSuccessfullyFetched ? (
      ) : (
        <>
          <h2
            style={{
              backgroundColor: 'black',
              color: 'white',
              fontSize: '36px',
              fontWeight: 600,
              textAlign: 'center',
              paddingTop: '20px',
            }}
          >
            Loading...
          </h2>
          <Player
            src="https://assets4.lottiefiles.com/packages/lf20_pJvtiSVyYH.json"
            className="player"
            loop
            autoplay
            background="black"
            style={{ height: '100vh', width: '100%' }}
          />
        </> */}
      {/* )} */}
    </PlayerContext.Provider>
  );
}

export const usePlayerContext = () => useContext(PlayerContext);
