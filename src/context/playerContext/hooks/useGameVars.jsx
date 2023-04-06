import { useState, useRef } from 'react';

const useGameVars = () => {
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
    endDate: null,
    goldGathRate: 1,
    popGrowthRate: 1,
    concreteGathRate: 1,
    metalsGathRate: 1,
    crystalsGathRate: 1,
    energyProd: 1,
    rank: 1,
    expenses: 1,
  });

  const maintenanceRef = useRef({
    gold: null,
  });
  return {
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
  };
};

export default useGameVars;
