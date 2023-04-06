import testCardTemplateData from './testCardTemplateData.json';
import { NameToImgMapping } from './constants.js';

/* - Explaining The Initialization Technic -
 * Most of React's Hooks and provided functions are async to boost performance.
 * This becomes a big problem when you start using Non-async functions that depend on React's async features.
 * To work around this, I have created some initialization steps that use flags to fix the order of the function execution.
 * The correct utilization of the useEffect hook is vital, you must know how the dependency array works and when it must be empty or check for flag changes
 * ------------------------------------------------------------------------------------------------
 */

// #1 Init Step - Converts the fetched JSON into JS Objects
export function cardsInit(fetchedCards) {
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

// #2 Init Step - Converts the fetched JSON into JS Objects
export function firstStepInit() {
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
  const techStoresCards = activeCards.filter((card) => card.templateId === 13);
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
