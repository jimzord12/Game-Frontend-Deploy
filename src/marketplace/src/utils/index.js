export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export function numberWithDots(num, isSP = false) {
  if (typeof num !== 'number') {
    return 'Error: Input is not a number';
  }
  console.log('1 - numberWithDots Number: ', num);

  if (Number.isNaN(num)) {
    return 'Error: Input is NaN';
  }

  if (num <= 10 && num > 0) {
    console.log('1 - numberWithDots Number: ', num);
    console.log('numberWithDots Is SP: ', isSP);
    // If the number is not an integer, multiply it by 100
    num *= 100;
    console.log('2 - numberWithDots Number: ', num);

    if (isSP) num -= 100;
    console.log('3 - numberWithDots Number: ', num);

    return num + ' %';
  }
  const numStr = num.toString();
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  return numStr.replace(regex, ',');
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export const rarityCoverter = (rarityNumber) => {
  if (rarityNumber === 1) return { text: 'Common', color: '255, 255, 255' };
  if (rarityNumber === 2) return { text: 'Special', color: '0, 204, 0' };
  if (rarityNumber === 3) return { text: 'Rare', color: '0, 102, 255' };
  if (rarityNumber === 4) return { text: 'Mythic', color: '230, 0, 230' };
  if (rarityNumber === 5) return { text: 'Legendary', color: '255, 102, 0' };
  console.error('😱 Something Wrong at: utils-Functions, in: rarityCoverter()');
};

export const smoothScrollTo = (targetY, duration = 200) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  const step = (time) => {
    const elapsed = time - startTime;
    const t = elapsed / duration;

    window.scrollTo(0, startY + distance * t);

    if (elapsed < duration) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};

export function getSoldCards(playerCards, soldCardsIds) {
  // Filter the playerCards array to only include cards that are sold
  const soldCards = playerCards.filter((card, index, arr) => {
    let hasCard = false;
    console.log(`[getSoldCards] (${index + 1}/${arr.length}) - ID: ${card.id}`);
    soldCardsIds.forEach((soldEvent) => {
      console.log('Has been sold: ', soldEvent.cardId === card.id);
      if (soldEvent.cardId === card.id) hasCard = true;
    });
    return hasCard;
  });
  console.log('getSoldCards: ', soldCards);
  return soldCards;
}

export function findOwnerWallet(card, playersArr) {
  const owner = playersArr.find((player) => {
    console.log(`Current Player: ${player.name} | Address: ${player.wallet}`);
    // console.log(`card.ownerId: ${card.ownerId} | Address: ${player.wallet}`);
    return card.ownerId === player.id;
  });
  console.log(`Card ID: ${card.id}`);
  console.log('findOwnerWallet: Owner: ', owner);
  return owner.wallet;
}

export function removeElementsFromArray(arr1, arr2) {
  // Create a new empty array to store the filtered elements
  const filteredArr = [];

  // Loop through the first array and check if each element is in the second array
  for (let i = 0; i < arr1.length; i++) {
    if (!arr2.includes(arr1[i])) {
      // If the element is not in the second array, add it to the filtered array
      filteredArr.push(arr1[i]);
    }
  }

  // Return the filtered array
  return filteredArr;
}
