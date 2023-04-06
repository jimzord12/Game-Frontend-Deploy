import Card from './classCard_V2.js';
import { secondsToDaysHrsMinSec } from '../../utils';

export default class SP extends Card {
  #state = false;

  // #cooldown = 604800000; // 7-Days in miliseconds

  #cooldown = 150000; // 8 seconds in miliseconds

  #startEffectTimestamp;

  #endEffectTimestamp;

  // #locked = false;

  // constructor(options) {
  //   // console.log("🎭 SP Class Construction says: Halooo!");
  //   super(options);
  //   // console.log("🎭 From Player Class: Special Card's Properties: ", this);
  // }

  // #wannaLockThisCard(choice) {
  //   this.#locked = choice;
  //   return console.log(
  //     `The Card: ${this.name} with CardID: ${this.cardId} is now ${
  //       choice ? "Unlocked" : "Locked"
  //     }!`
  //   );
  // }

  // -- Private methods --

  #convertStartToDate() {
    const date = new Date(Number(this.#startEffectTimestamp));
    return date.toLocaleString('en-GB');
  }

  #convertEndToDate() {
    const date = new Date(Number(this.#endEffectTimestamp));
    return date.toLocaleString('en-GB');
  }

  #calcEffectEnd() {
    this.#endEffectTimestamp = this.#startEffectTimestamp + this.#cooldown;
  }

  // -- Public Methods --
  activate() {
    // if (this.#locked === true)
    // return alert(`The Card: ${this.name} with ID: ${this.id} is Locked`);
    this.#state = true;
    this.#startEffectTimestamp = Date.now();
    // this.#wannaLockThisCard(true);
    this.#calcEffectEnd();
    console.log(
      `Activating ${this.name}: ID: ${this.id}, Card ID: ${this.cardId} Type: ${this.type}, CurrentLevel: ${this.getCurrentLevel}`
    );
    const startDate = this.#convertStartToDate();
    const endDate = this.#convertEndToDate();
    return {
      newState: this.#state,
      StartEffectDate: startDate,
      EndEffectDate: endDate,
    };
  }

  deactivate() {
    if (Date.now() >= this.#endEffectTimestamp) {
      this.#state = false;
      // this.#wannaLockThisCard(false);
      return {
        newState: this.#state,
        StartEffectDate: this.#convertStartToDate(),
        EndEffectDate: this.#convertEndToDate(),
      };
    }
    const { seconds, minutes, hours, days } = secondsToDaysHrsMinSec(
      this.#endEffectTimestamp - Date.now()
    );

    return console.log(
      `The Card's Effect is still valid, it expires in:\n Days: ${days}, Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`
    );

    // alert(
    //   `The Card's Effect is still valid, it expires in ${result.totalDays} Days, ${result.totalMins} Minutes, ${result.totalSecs} Seconds`

    //   parseInt(
    //   (Number(this.#endEffectTimestamp) - Number(Date.now())) / 1000,
    //   10
    // )
  }
}
