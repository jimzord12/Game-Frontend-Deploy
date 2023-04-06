export default class Card {
  level = 1;

  locked = true; // The Card must be unlocked by Researching it!

  state = false;

  /**
   * @param {{}} options The Specifications for creating a Card instance.
   */
  constructor(options) {
    this.id = options.id; // This is UNIQUE, to match the NFT AND also an Array!!!
    this.cardId = options.cardId; // NOT unique, for eg: 2 Wind Turbine Cards will have the same cardId
    this.type = options.type; // Can be either: "Building", "REG", or "SP"
    this.rarity = options.rarity;
    this.name = options.name; // eg: "Wind Turbine"
    // this.amount = options.amount;
    this.img = options.img;
    this.output = options.output;
    this.requirements = options.requirements; // of type: Object, eg:
  }

  // Private Methods

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @param {number} byThisMuch The percentage used for increamenting the resources needed for the next level. eg: 1.2 for 20%
   * @returns If successful, the new requirements & old requirements | Else, error message
   */
  #updateRequiredResources(byThisMuch) {
    if (byThisMuch <= 0 || byThisMuch > 4)
      return {
        success: false,
        message: 'Class Card -> #updateRequiredResources(): Invalid Args',
      };
    const oldReqs = { ...this.requirements };
    // eslint-disable-next-line no-restricted-syntax
    for (const [requirement, value] of Object.entries(this.requirements)) {
      // if (
      //   typeof value === "object" &&
      //   value !== null &&
      //   !Array.isArray(value)
      // ) {

      this.requirements[`${requirement}`] = Math.ceil(value * byThisMuch);
    }
    return { success: true, newReqs: this.requirements, oldReqs };
  }

  /**
   *
   * @param {number} byThisMuch The percentage used for increamenting the resources needed for the next level. eg: 1.2 for 20%
   * @returns If successful, the new Outputs & old Outputs | Else, error message
   */
  #increaseOutput(byThisMuch) {
    const oldOutput = { ...this.output };
    const outputProperty = Object.keys(this.output);
    if (outputProperty.length === 0)
      return {
        success: false,
        message: `Class Card -> increaseOutput(): The Card: ${this.name}, does not produce a output`,
      };
    // eslint-disable-next-line no-restricted-syntax
    for (const [output, value] of Object.entries(this.output)) {
      if (typeof value === 'number')
        this.output[`${output}`] = parseFloat((byThisMuch * value).toFixed(2));
    }
    return { success: true, oldOutput, newOutput: this.output };
  }

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @param {{}} playerResources An Object containing the Player's resources
   * @returns An Object with the new reduced Player's Resources. If "success" false Card can not be Crafted. "Null" means insufficient resource
   */
  #canBeLeveledUp(playerResources) {
    const tempObj = {};
    let success = true;
    // eslint-disable-next-line no-restricted-syntax
    for (const [resource, amount] of Object.entries(playerResources)) {
      console.log(
        `Player's ${resource}: ${amount}`.padEnd(28, ' '),
        `| Required: ${this.requirements[`${resource}`]}`.padEnd(22, ' '),
        `| Success: ${
          amount >= this.requirements[`${resource}`] ||
          this.requirements[`${resource}`] === undefined
        }`
      );

      if (
        amount >= this.requirements[`${resource}`] ||
        this.requirements[`${resource}`] === undefined
      ) {
        tempObj[`${resource}`] = amount - this.requirements[`${resource}`];
      } else {
        tempObj[`${resource}`] = null;
        success = false;
      }
    }
    return { success, ...tempObj };
  }

  // Public Methods - (API)

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @dev IMPORTANT: This method does NOT reduce the Player's Resources upon execution!!!
   * @param {{}} playerResources The Current Resources The Player has
   * @returns success, currentLevel
   */
  levelUp(playerResources) {
    console.log(
      '%cDo NOT Forget! When this method is called,\nalso call player.removeResources()',
      'font-weight: bold; font-size: 13px'
    );
    if (this.level === 5)
      return {
        success: false,
        level: this.level,
        message:
          'Card Class -> levelUp(): Reached max level! Can not level up any more',
      };

    if (this.level < 0)
      return {
        success: false,
        level: this.level,
        message:
          'Card Class -> levelUp(): Class Card -> levelUp(): Something went terribly wrong xD',
      };

    if (this.#canBeLeveledUp(playerResources).success) {
      console.log(this.#updateRequiredResources(1.2));
      //If the card doesn't have an output, there is not reason for leveling in up
      if (this.output) console.log(this.#increaseOutput(1.2));
      this.level += 1;

      return { success: true, level: this.level };
    }
    return {
      success: false,
      level: this.level,
      message: 'Card Class -> levelUp(): Something Went Wrong',
    };
  }

  /**
   * @param {boolean} state
   */
  unlock() {
    this.locked = false;
  }

  activate() {
    const oldState = this.state;
    this.state = true;
    console.log(
      `Activating ${this.name}: ID: ${this.id}, Card ID: ${this.cardId} Type: ${this.type}, CurrentLevel: ${this.getCurrentLevel}`
    );
    return { success: true, newState: this.state, oldState };
  }

  deactivate() {
    const oldState = this.state;
    this.state = false;
    console.log(
      `Deactivating ${this.name}: ID: ${this.id}, Card ID: ${this.cardId} Type: ${this.type}, CurrentLevel: ${this.getCurrentLevel}`
    );
    return { success: true, newState: this.state, oldState };
  }

  // Getters
  get getCurrentLevel() {
    return this.level;
  }

  get isLocked() {
    return this.locked;
  }

  get getCurrentState() {
    return this.state;
  }
}
