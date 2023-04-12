import testPlayerData from './testPlayerData.json';

// Function to store data in localStorage
export const setLSItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}": ${error}`);
  }
};

// Function to retrieve data from localStorage
export const getLSItem = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : false;
  } catch (error) {
    console.error(`Error getting localStorage key "${key}": ${error}`);
    return false;
  }
};

export function randNumber4Testing() {
  return Math.floor(Math.random() * 3000) + 2;
}

export function removeObjectWithId(arr, id) {
  return arr.filter((obj) => obj.id !== id);
}

export function roundToDecimal(number, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
}

export function hoursToSecRates(
  gatheringRate,
  secondsTick,
  needCatchUp = false
) {
  //@Docs:
  // The game loop runs every (5 seconds), but the gathering rates represent
  // production per hour. So we need to find out how much production has happened in 5 secs.
  // Now, when a Non-New player logs in, we have to calculate the amount of resources that were produced during his/her absence.
  // To do this, we will simulate the number of loops that would have taken place if the player did not leave the game. However, to increase performance, we will change the time precision of the calculations. From 5 seconds to 10 minutes.
  // This obviously, results in less precision because the gap of time we check is bigger than before, but the gains are that we need to run 6 loops per hour that has passed, rather than 720 loops. If 7 days have passed, we will have to run around 1000 loops using the 10min precision, whereas using the 5sec one 120,960.
  if (needCatchUp) {
    const catchUpTimeUnit = 60 / 10; // 10 minutes per hour
    return Number(gatheringRate) / catchUpTimeUnit;
  }
  const mathCalc = Number(gatheringRate) / (60 * (60 / secondsTick));
  return roundToDecimal(mathCalc, 4);
}

export function datesDelta(activationDate, currentDate) {
  // Subtract the time values of the two dates to get the difference in milliseconds
  const diff = activationDate - currentDate;
  console.log('activationDate: ', activationDate);
  console.log('currentDate: ', currentDate);
  console.log('diff: ', diff);

  // Check if the difference is less than or equal to zero
  if (diff <= 0) {
    return false;
  }
  // Returns true if the effect has still remaining time...
  return true;
}

//@Important: "precision" must be in milliseconds!
export function calcTimeUnits(previousDate, currentDate, precision) {
  const convertedPrevDate = mysqlDatetimeToUnixTimestamp(previousDate) / 1000;
  const diff = Math.abs(currentDate - convertedPrevDate);
  console.log('1 - Utils::calcTimeUnits: Diff => ', diff);
  console.log(
    '2 - Utils::calcTimeUnits: Diff => ',
    Math.trunc(diff / precision)
  );
  // if the difference is greater than 7 Days...
  if (diff > 604800000) {
    alert(
      '😔 We are very sorry to inform you that because you were absent more than 7 Days, your account was disabled and your progress was lost!'
    );
    return 0;
  }
  return Math.trunc(diff / precision);
}

export function convertToMySQLDatetime(timestamp) {
  // const timestampInSeconds = Math.floor(timestamp / 1000);
  // const date = new Date(timestampInSeconds * 1000);
  // return date.toISOString().slice(0, 19).replace('T', ' ');
  const date = new Date(timestamp);

  const pad = (num) => (num < 10 ? '0' + num : num);

  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1); // Months are zero-based
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mi = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

export function mysqlDatetimeToUnixTimestamp(mysqlDatetime) {
  console.log('mysqlDatetimeToUnixTimestamp::Input => ', mysqlDatetime);
  const localDatetime = mysqlDatetime.slice(0, 19);
  const date = new Date(localDatetime);
  console.log('jhiunnnnnvgbgv: ', date.getTime());
  return date.getTime() * 1000;
}

// export function mysqlDatetimeToUnixTimestamp(mysqlDatetime) {
//   console.log('mysqlDatetimeToUnixTimestamp ==> ', mysqlDatetime);
//   const [datePart, timePart] = mysqlDatetime.split(' ');

//   const [year, month, day] = datePart.split('-').map(Number);
//   const [hours, minutes, seconds] = timePart.split(':').map(Number);

//   const date = new Date(year, month - 1, day, hours, minutes, seconds);

//   console.log('jhiunnnnnvgbgv: ', date.getTime());
//   return date.getTime();
// }

export function needCatchUp(previousDate, currentDate) {
  // If New Player, no need to catch up
  if (previousDate === null || previousDate === 0) return false;

  const convertedPrevDate = mysqlDatetimeToUnixTimestamp(previousDate) / 1000;
  const diff = Math.abs(currentDate - convertedPrevDate);
  console.log('Player Last Known Login Timestamp: ', convertedPrevDate);
  console.log('Current Date (Now): ', currentDate);
  console.log('Their Difference: ', diff);

  if (diff > 900000) {
    // 15 mins
    console.log('Catch Up is required!');
    return true;
  }
  console.log('There is no need to catch up the progress of your account');
  return false;
}
