import logoGenera from './logoGenera.png';
import footerImg from './footerImg.jpg';
import UniwaLogo from './Uniwa-Logo.png';
// import bigImg from './maps/bigImg.jpg';
import {
  TownDemoMap,
  Selection_TownDemoMap,
  Selection_WorldMap,
  Selection_EnergyZoneMap,
} from './maps';

export {
  logoGenera,
  footerImg,
  Selection_TownDemoMap,
  Selection_WorldMap,
  Selection_EnergyZoneMap,
  TownDemoMap,
  UniwaLogo,
};

// Here are the Selection Images that are displayed in the BattleGround Page!
// NOT the Actual MAPS!
export const maps = [
  { id: 'bg-town', image: Selection_TownDemoMap, name: 'Town Map' },
  { id: 'bg-energy', image: Selection_EnergyZoneMap, name: 'Energy Map' },
  { id: 'bg-world', image: Selection_WorldMap, name: 'World Map' },
  // { id: "bg-saiman", image: saiman, name: "Saiman" },
  // { id: 'bg-island', image: undefined, name: 'Island Map' },
];
