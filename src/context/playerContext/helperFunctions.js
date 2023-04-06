import testPlayerData from './testPlayerData.json';

function isNewPlayer(_playerId) {
  // Look up if the player has the new newPlayer = true, fetch from Database
  // @Note: Don't forget to make the function "asynchronous"
  return testPlayerData.playerId ? false : true;
}

// Check if the player has any data on Browser's Local Storage
function hasDataInLS(_playerId) {
  if (isNewPlayer(_playerId)) return false;
  return getLSItem('genera-game-playerId') ? true : false;
}

// Game Mechanics - Calculators
function calcLivingStandards(base, population, bonus, housing) {
  // Possible Outcomes:
  //  1. Available Houses and positive happiness => result (pop increasing)
  //  2. Available Houses and negative happiness => result (pop decreasing)
  //  3. NO Available Houses and positive happiness => 0 (pop can't increase)
  //  4. NO Available Houses and negative happiness => result (pop decreasing)
  const availableHouses = Number(housing) - Number(population);
  const happiness = Number(bonus) + Number(base) - Number(population);
  if (availableHouses <= 0 && happiness >= 0) return 0;
  return happiness;
}

function calcIncome(_availWorkers, multiplier) {
  return Number(_availWorkers) * Number(multiplier);
}

function calcPercentage(a, b) {
  return (Number(b) / Number(a)) * 100;
}

function calcPrivSector(totalC, concreteW, metalsW, crystalsW) {
  const result =
    Number(totalC) - Number(concreteW) - Number(crystalsW) - Number(metalsW);
  // console.log('totalC: ', totalC);
  // console.log('concreteW: ', concreteW);
  // console.log('crystalsW: ', crystalsW);
  // console.log('metalsW: ', metalsW);
  // console.log('result: ', result);
  return result <= 0 ? 0 : result;
}

function calcRank(totalPopulation, totalEnergy) {
  // Set the weights for population and energy
  const populationWeight = 0.7;
  const energyWeight = 0.3;

  // Calculate the weighted average of population and energy
  const weightedAverage =
    populationWeight * totalPopulation + energyWeight * totalEnergy;

  // Determine the maximum possible score based on the number of digits
  const maxScore = 999999;

  // Determine the maximum possible value of the weighted average
  const maxWeightedAverage =
    (maxScore / (populationWeight * Number.MAX_SAFE_INTEGER)) *
    (energyWeight * Number.MAX_SAFE_INTEGER);

  // Calculate the scaling factor to map the weighted average to the score range
  const scalingFactor = maxScore / maxWeightedAverage;

  // Scale the weighted average to a score between 1 and maxScore
  const score = Math.floor(weightedAverage * scalingFactor);

  return score;
}

// Used to calculate the Spacing (Housing, Buildings, Generators)
// lvl1 => 50%, lvl2 => 75%
function calcSpacing(level, type) {
  const startingHousingSpace = 60; // Max Population Limit
  const startingBuildingsSpace = 4; // Max Buildings Limit
  const startingGeneratorsSpace = 2; // Max Generators Limit
  let result = 0;
  if (type.toLowerCase() === 'housing')
    if (level === 1) {
      result = startingHousingSpace;
    } else {
      result = startingHousingSpace * Math.pow(1 + Number(level) / 4, 2);
    }
  if (type.toLowerCase() === 'buildings')
    result = startingBuildingsSpace + level - 1;
  if (type.toLowerCase() === 'generators')
    result = startingGeneratorsSpace + level - 1;

  return Math.round(result);
}

function calcSum(arrayOfCards, ...propKeys) {
  if (arrayOfCards.length === 0 || arrayOfCards === undefined) return 0;
  if (propKeys.length === 1)
    return arrayOfCards.reduce(
      (acc, currentCard) => acc + currentCard[propKeys[0]],
      0
    );
  if (propKeys.length === 2) {
    return arrayOfCards.reduce(
      (acc, currentCard) => acc + currentCard[propKeys[0]][propKeys[1]],
      0
    );
  }
  if (propKeys.length === 3)
    return arrayOfCards.reduce(
      (acc, currentCard) =>
        acc + currentCard[propKeys[0]][propKeys[1]][propKeys[2]],
      0
    );
}

// param: techstoreCard, can is an array
function calcMultiplier(techstoreCards, type, base) {
  if (techstoreCards === undefined || techstoreCards.length === 0) return base;
  let result = techstoreCards.reduce((acc, techstoreCard) => {
    const boost = techstoreCard.output.boost;
    console.log('HelperFn::calcMultiplier => Boost: ', boost);
    return Number(techstoreCard.stats[`${type}`]) * boost + acc;
  }, 0);
  // return Number(techstoreCard.stats[`${type}ToolLvl`]) * base;
  // console.log(
  //   'HelperFn::calcMultiplier => Type: ',
  //   type,
  //   '| result: ',
  //   result + 1
  // );
  // console.log(
  //   'HelperFn::calcMultiplier => Base: ',
  //   base,
  //   ' | Returns: ',
  //   (Number(result) + 1) * base
  // );
  return (Number(result) + 1) * base;
}

function calcProduction(_assignedWorkers, multiplier) {
  return Number(_assignedWorkers) * Number(multiplier);
}

// function calcProduction(_assignedWorkers, techStore, type) {
//   const baseGoldMulti = 20;
//   const baseConcreteMulti = 5;
//   const baseMetalsMulti = 3;
//   const baseCrystalsMulti = 1;
//   if (techStore === undefined) {
//     if (type === 'gold')
//       return Number(_assignedWorkers) * Number(baseGoldMulti);
//     if (type === 'concrete')
//       return Number(_assignedWorkers) * Number(baseConcreteMulti);
//     if (type === 'metals')
//       return Number(_assignedWorkers) * Number(baseMetalsMulti);
//     if (type === 'crystals')
//       return Number(_assignedWorkers) * Number(baseCrystalsMulti);
//   }

//   // The Player has Techstore
//   if (type === 'gold')
//     return (
//       Number(_assignedWorkers) *
//       (Number(baseGoldMulti) + techStore.stats[`${type}MultiLvl`])
//     );
//   if (type === 'concrete')
//     return (
//       Number(_assignedWorkers) *
//       (Number(baseConcreteMulti) + techStore.stats[`${type}MultiLvl`])
//     );
//   if (type === 'metals')
//     return (
//       Number(_assignedWorkers) *
//       (Number(baseMetalsMulti) + techStore.stats[`${type}MultiLvl`])
//     );
//   if (type === 'crystals')
//     return (
//       Number(_assignedWorkers) *
//       (Number(baseCrystalsMulti) + techStore.stats[`${type}MultiLvl`])
//     );
// }

function filterCardCategory(arrayOfCards, catType) {
  return arrayOfCards.filter(
    (card) => card.type.toLowerCase() === catType.toLowerCase()
  );
}

function findCardByTempId(arrayOfCards, templateId) {
  return arrayOfCards.find((card) => card.templateId === templateId);
}

function findCardById(arrayOfCards, id) {
  return arrayOfCards.find((card) => card.id === id);
}

function calcUpdatedGathValue(oldValue, rate) {
  return oldValue + rate;
}

function cardsStateManager(arrayOfCards, action, serverCb) {
  arrayOfCards.forEach((card, index) => {
    let oldCardState = card.state;
    console.log(
      'HelperFunctions::cardsStateManager: (',
      index,
      ') Old State: ',
      oldCardState
    );
    if (action === 'activate') {
      card.activate();
      console.log(
        'HelperFunctions::cardsStateManager: (',
        index,
        ') New State: ',
        card.state
      );
    } else {
      card.deactivate();
      console.log(
        'HelperFunctions::cardsStateManager: (',
        index,
        ') Old State: ',
        card.state
      );
    }
    // Updating/Syncing the Server/Database State
    const { id, state, disabled } = card;
    serverCb({ id, state, disabled });
  });
}

export {
  isNewPlayer,
  hasDataInLS,
  calcLivingStandards,
  calcIncome,
  calcPercentage,
  calcPrivSector,
  calcProduction,
  calcRank,
  calcSpacing,
  calcSum,
  calcMultiplier,
  filterCardCategory,
  findCardByTempId,
  findCardById,
  calcUpdatedGathValue,
  cardsStateManager,
};
