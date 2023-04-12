import {
  Restaurant,
  Techstore,
  TownHall,
  WindTurbine,
} from '../../myAssets/mapCardRepresentationImages';
import WindTurbine_V2 from '../../myAssets/cardImages/windTurbine.png';
import workaholismImg from '../../myAssets/temp/workaholism.png';

// Game's Constants - Starting Values
const livingStandardsBase = 200; // 200% || 2.0 new Ctizens per hour
const startingHousingSpace = 60; // Max Population Limit
const startingBuildingsSpace = 4; // Max Buildings Limit
const startingGeneratorsSpace = 2; // Max Generators Limit

const startingPop = 30;
const startingResources = {
  gold: 100000,
  concrete: 50000,
  metals: 30000,
  crystals: 25000,
};

const baseMultis = {
  baseGoldMulti: 20,
  baseConcreteMulti: 5,
  baseMetalsMulti: 3,
  baseCrystalsMulti: 1,
};

const NameToImgMapping = {
  WindTurbine: WindTurbine_V2,
  Workaholism: workaholismImg,
  Techstore: Techstore,
};

const cardsWithStats = [13];

// ⏰ Time related constants ⏰
const day = 1 * 24 * 60 * 60 * 1000;
const hour = 60 * 60 * 1000;
const minute = 60 * 1000;
const effectDuration = 12 * hour; //
const catchUpLoopDuration = 10 * minute; // 10 minutes
const gamePace = 5; // Game Loop's Timer in Seconds

// 🔐 Web Server & Database Constants 🔐
const apiEndpointPlayer = 'players';
const apiEndpointCards = 'cards';
const apiEndpointPlayerCards = 'player-cards';
const apiEndpointLatestId = 'latest-id';

export {
  livingStandardsBase,
  startingHousingSpace,
  startingBuildingsSpace,
  startingGeneratorsSpace,
  startingPop,
  startingResources,
  baseMultis,
  NameToImgMapping,
  day,
  minute,
  effectDuration,
  catchUpLoopDuration,
  gamePace,
  apiEndpointPlayer,
  apiEndpointCards,
  apiEndpointPlayerCards,
  apiEndpointLatestId,
  cardsWithStats,
};
