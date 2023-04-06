import Player from '../Classes/classPlayer';
// import { setPlayer, getPlayer } from "../data";
/**
 *
 * @param {Number} amount How many instances of this type should be created.
 * @param {Array} dataArray An Array of {Options} from which the instances should be created.
 * @returns An array of instances
 */
export default function playerFactory(dataObj) {
  console.log('🧟‍♂️ Player Factory 🧟‍♂️');
  console.log('playerFactory: Entering -> ', dataObj);

  const { success, firstPlayer, playersArray, message } = getPlayer();
  if (firstPlayer) {
    console.log(message);
    const newPlayer = new Player(dataObj);
    const { success: setSuccess, message: setMessage } = setPlayer(
      newPlayer,
      playersArray
    );
    console.log(
      'Has the Player Successfully been Stored in the Database: ',
      setSuccess
    );
    if (setSuccess) return newPlayer;
    return { success: false, setMessage };
  }

  console.log(
    'playerFactory: Was Card Retrieval from Database Successful: ',
    success
  );
  if (success) {
    console.log('PlayerFactory -> 2nd if: ', playersArray);
    const cardIndex = playersArray.findIndex((player) => {
      console.log('Filter Array: ', dataObj, player);
      return dataObj.id === player.id;
    });
    console.log('playerFactory: There are Duplicates: ', cardIndex !== -1);
    if (cardIndex !== -1) {
      console.log(
        'Player already exists! Players are Unique and can NOT be Duplicated'
      );
      console.log('Retrieving The Desired Player Entity from Database...');
      const retrivedPlayer = new Player(dataObj);
      console.log('Player from Database: ', new Player(dataObj));
      console.log('Adding New Property to player: fresh: false');
      retrivedPlayer.fresh = false;
      return retrivedPlayer;
    }

    const newPlayer = new Player(dataObj);
    const { success: setSuccess, message: setMessage } = setPlayer(
      newPlayer,
      playersArray
    );
    console.log(
      'Has the Player Successfully been Stored in the Database: ',
      setSuccess
    );
    if (setSuccess) return newPlayer;
    return { success: false, setMessage };
  }
  return {
    success: false,
    message: ' Factories > PlayerFactory: Something went wrong...',
  };
}
