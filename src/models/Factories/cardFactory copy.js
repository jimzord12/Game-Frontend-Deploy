import Building from '../classBuilding';
import REG from '../classREG';
import SP from '../classSP';
import { getCards, setCards } from '../data';

/**
 * 🧪 Testing Stage: Completed Simple Testing
 * @dev Checks if the given type is a valid string
 * @dev Calls getCards() to get the cards from the "Database"
 * @param {{cardId: number, img: string, requirements: {gold: number}, etc}} dataObj An Object containing the Card specifications.
 * @returns If succesful, an Instance created from the specified Class Type | Else, false * alert prompt
 */
function createCard(dataObj, cardsArray) {
  console.log('createCard: Entering...');

  let newCard = {};
  const type = dataObj.type.toLowerCase();

  if (type === 'building') {
    console.log('🧱 Building Class Construction 🧱');

    newCard = new Building(dataObj); // Creates the Card
    console.log('🧱 The new Building Card: ', newCard);

    const { success: setSuccess, message } = setCards(newCard, cardsArray); // Store the Card in the database
    console.log('Was Card Storage to Database Successful: ', setSuccess);

    // If it is successfully Stored in the database -> Return the Card
    console.log('🏭 End of Card Factory');
    if (setSuccess) return { success: true, card: newCard };

    // If NOT successfully Stored in the database -> Return { success: false, message }
    console.log('🏭 End of Card Factory');
    return { success: false, message };
  }

  if (type === 'reg') {
    console.log('🎇 REG Class Construction 🎇');

    newCard = new REG(dataObj); // Creates the Card
    console.log('🎇 The new REG Card: ', newCard);

    const { success: setSuccess, message } = setCards(newCard, cardsArray); // Store the Card in the database
    console.log('Was Card Storage to Database Successful: ', setSuccess);

    // If it is successfully Stored in the database -> Return the Card
    console.log('🏭 End of Card Factory');
    if (setSuccess) return { success: true, card: newCard };

    // If NOT successfully Stored in the database -> Return { success: false, message }
    console.log('🏭 End of Card Factory');
    return { success: false, message };
  }

  if (type === 'special effect') {
    console.log('🎭 SP Class Construction 🎭');

    newCard = new SP(dataObj); // Creates the Card
    console.log('🎭 The new Special Effect Card: ', newCard);

    const { success: setSuccess, message } = setCards(newCard, cardsArray); // Store the Card in the database
    console.log('Was Card Storage to Database Successful: ', setSuccess);

    // If it is successfully Stored in the database -> Return the Card
    console.log('🏭 End of Card Factory');
    if (setSuccess) return { success: true, card: newCard };

    // If NOT successfully Stored in the database -> Return { success: false, message }
    console.log('🏭 End of Card Factory');
    return { success: false, message };
  }
  alert(
    'The type you inserted is not supported, try one of the following: Building, REG, Special Effect'
  );
  return false;
}
// TODO: In the future: The @param dataObj will be fetched from MySQl database
export default function cardFactory(dataObj) {
  console.log('Card - Factory: Entering -> ', dataObj);
  console.log(`🏭 Card Factory 🏭 ID: ${dataObj.id}`);
  console.log('cardFactory: Entering...');

  const { success, firstCard, cardsArray, message } = getCards();
  if (firstCard) {
    console.log(message);
    return createCard(dataObj, cardsArray);
  }
  console.log(
    'cardFactory: Was Card Retrieval from Database Successful: ',
    success
  );

  // Checks if Cards exist in the database
  if (success) {
    const cardIndex = cardsArray.findIndex((card) => dataObj.id === card.id);
    console.log(
      'CardFactory: Does the Card have Duplicates: ',
      cardIndex !== -1
    );

    // Checks particular card already exists in the database
    // If it is not Unique, then...
    if (cardIndex !== -1) {
      console.log('CardFactory: Card already exists in the database!');
      console.log('CardFactory: Retrieving the Requested Card the database...');
      let card = {};
      if (dataObj.type === 'Building') card = new Building(dataObj);
      if (dataObj.type === 'REG') card = new REG(dataObj);
      if (dataObj.type === 'Special Effect') card = new SP(dataObj);
      console.log('CardFactory: The retrieved Card Entity: ', card);
      return {
        success: false,
        message:
          ' Card already exists! Cards are Unique and can NOT be Duplicated',
        card,
      };
    }

    // if It is Unique, then create it!
    return createCard(dataObj, cardsArray);
  }
}
