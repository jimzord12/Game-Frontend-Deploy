// Utility functions

export function calcIncome(_availWorkers, multiplier) {
  return Number(_availWorkers) * Number(multiplier);
}

export function calcPercentage(a, b) {
  return (Number(b) / Number(a)) * 100;
}

export function calcAvailCitizens(totalC, concreteW, crystalsW, metalsW) {
  const result =
    Number(totalC) - Number(concreteW) - Number(crystalsW) - Number(metalsW);
  return result <= 0 ? 0 : result;
}

export function calcProduction(_assignedWorkers, multiplier) {
  return Number(_assignedWorkers) * Number(multiplier);
}

export function calcSpacing(level, type) {
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

// export function calcIncome(_availWorkers, multiplier, stateSetter) {
//   stateSetter(Number(_availWorkers) * Number(multiplier));
//   return Number(_availWorkers) * Number(multiplier);
// }

// export function calcPercentage(a, b) {
//   return (Number(b) / Number(a)) * 100;
// }

// export function calcAvailCitizens(
//   totalC,
//   concreteW,
//   crystalsW,
//   metalsW,
//   stateSetter
// ) {
//   const result =
//     Number(totalC) - Number(concreteW) - Number(crystalsW) - Number(metalsW);
//   stateSetter(result <= 0 ? 0 : result);
//   return result <= 0 ? 0 : result;
// }

// export function calcProduction(_assignedWorkers, multiplier, stateSetter) {
//   stateSetter(Number(_assignedWorkers) * Number(multiplier));
//   return Number(_assignedWorkers) * Number(multiplier);
// }
