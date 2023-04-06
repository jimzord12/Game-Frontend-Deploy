import Building from '../Classes/classBuilding';
import REG from '../Classes/classREG';
import SP from '../Classes/classSP';

/**
 * 🧪 Testing Stage: Completed Simple Testing
 * @dev Checks if the given type is a valid string
 * @dev Calls getCards() to get the cards from the "Database"
 * @param {{cardId: number, img: string, requirements: {gold: number}, etc}} dataObj An Object containing the Card specifications.
 * @returns If succesful, an Instance created from the specified Class Type | Else, false * alert prompt
 */
function createCard(dataObj) {
  console.log('createCard: Entering...');

  let newCard = {};
  const type = dataObj.type.toLowerCase();

  if (type === 'building') {
    newCard = new Building(dataObj); // Creates the Card
    console.log('🧱 The new Building Card: ', newCard);
    return newCard;
  }

  if (type === 'reg') {
    newCard = new REG(dataObj); // Creates the Card
    console.log('🎇 The new REG Card: ', newCard);
    return newCard;
  }

  if (type === 'special effect') {
    newCard = new SP(dataObj); // Creates the Card
    console.log('🎭 The new Special Effect Card: ', newCard);
    return newCard;
  }
  alert(
    'The type you inserted is not supported, try one of the following: Building, REG, Special Effect'
  );
  return false;
}
// TODO: In the future: The @param dataObj will be fetched from MySQl database
export default function cardFactory(dataObj) {
  console.log(`🏭 Card Factory 🏭 ID: ${dataObj.id}`);
  return createCard(dataObj);
}
