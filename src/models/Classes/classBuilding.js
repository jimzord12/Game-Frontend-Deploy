import Card from './classCard_V2.js';
// import { buildingTypes } from "./Factories/data";

export default class Building extends Card {
  #currentPersonnel = 0;

  #joblimit = 0;

  constructor(options) {
    super(options);
    if (options.offersJobs) {
      this.offersJobs = options.offersJobs;
      this.#joblimit = options.jobLimit;
    }
    // this.updateStats(buildingTypes[options.]);
    // console.log("🧱 From Building Class: Building's Properties: ", this);
  }

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @dev In game, this function will be represented by a Slider Component
   * @param {number} amount The amount of citizens to be hired for this Building
   * @returns If successful, the updated Personnel & previous Personnel | Else, an error message is returned
   */
  assignPersonnel(amount) {
    const prevPersonnel = this.#currentPersonnel;
    if (
      typeof amount === 'number' &&
      amount > 0 &&
      amount <= this.#joblimit &&
      this.offersJobs
    ) {
      this.#currentPersonnel = amount;

      console.log(
        `This method was called from the Building Prototype: ${this.name} with ID: ${this.id} `
      );
      return {
        success: true,
        updatedPersonnel: this.#currentPersonnel,
        prevPersonnel,
      };
    }
    return {
      success: false,
      message: `Class Building -> assignPersonnel(): Wrong input, must be: a positive number, between 0 and ${this.jobLimit} inclusive`,
    };
  }

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @dev First, calls the some method from the Super Class (Card) and then updated this Building's job stats
   * @param {{}} playerResources The Current Resources The Player has
   * @returns If successful, the updated Job Limit, the updated Level, previous Job Limit | Else, error message
   */
  levelUp(playerResources) {
    const {
      success,
      level,
      message: SuperClassErrMessage,
    } = super.levelUp(playerResources);
    const prevJobLimit = this.#joblimit;
    if (success) {
      this.#joblimit = Math.ceil(this.#joblimit * 1.2);
      return {
        success: true,
        level,
        updatedJobLimit: this.#joblimit,
        prevJobLimit,
      };
    }
    return {
      success: false,
      message: `Class Building -> levelUp(): ${SuperClassErrMessage}`,
    };
  }
}
