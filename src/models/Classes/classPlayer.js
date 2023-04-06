import { cardFactory } from '../Factories';
/* eslint-disable */
export default class Player {
  inventory = [];
  marketplace = [];
  resources = {};
  accessToMP = false;
  rank = undefined;
  rankPoints = 0;
  alliance = undefined;

  constructor(options) {
    this.id = options.id;
    this.img = options.img;
    this.name = options.name;
    // console.log("🤯 From Player Class: Player's Properties: ", this);
  }

  // Private Methods

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @param {Card} cardElement The Card object we wish to modify
   * @param {Card[]} array An array of Card objects
   * @returns {{success: Boolean, message: String}} {success: Boolean, message: String}
   */
  #existsIn(cardElement, array) {
    const cardIndex = array.findIndex((card) => cardElement.id === card.id);
    if (cardIndex !== -1) return { success: true, index: cardIndex };
    return { success: false, message: ' Card does not exist in this array' };
  }

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @param {{}} playerResources An Object containing the Player's resources
   * @returns An Object with the new reduced Player's Resources. If "success" false Card can not be Crafted. "Null" means insufficient resource
   */
  #canBeCrafted(selectedCard) {
    const tempObj = {};
    let isUnique = true;
    let success = true;
    // checkig for sufficient resources

    // eslint-disable-next-line no-restricted-syntax
    if (Object.entries(this.resources))
      return { success: false, message: 'No available resources! 😓' };
    for (const [resource, amount] of Object.entries(this.resources)) {
      console.log(
        'AAAAAAAAAA',
        amount >= selectedCard.requirements[`${resource}`],
        selectedCard.requirements[`${resource}`] === undefined
      );
      console.log(
        `Player's ${resource}: ${amount}`.padEnd(28, ' '),
        `| Required: ${selectedCard.requirements[`${resource}`]}`.padEnd(
          22,
          ' '
        ),
        `| Success: ${
          amount >= selectedCard.requirements[`${resource}`] ||
          selectedCard.requirements[`${resource}`] === undefined
        }`
      );

      if (
        amount >= selectedCard.requirements[`${resource}`] ||
        selectedCard.requirements[`${resource}`] === undefined
      ) {
        console.log(
          'AAAAAAAAAA',
          amount >= selectedCard.requirements[`${resource}`],
          selectedCard.requirements[`${resource}`] === undefined
        );
        tempObj[`${resource}`] =
          amount - selectedCard.requirements[`${resource}`];
      } else {
        console.log(
          'AAAAAAAAAA',
          amount >= selectedCard.requirements[`${resource}`],
          selectedCard.requirements[`${resource}`] === undefined
        );
        tempObj[`${resource}`] = null;
        success = false;
      }
    }

    // Checks if this Card already exists in Player's Inventory
    if (this.inventory.length > 0) {
      for (let i = 0; i < this.inventory.length; i += 1) {
        if (selectedCard.id === this.inventory[i].id) isUnique = false;
      }
    }

    console.log('Can the Player Craft this Card: ', isUnique && success);
    if (isUnique && success) {
      console.log('🥳 Congrats! 🥳 You just crafted this Card: ', selectedCard);
      return { success: true };
    } else if (!success) {
      console.log(
        'You do not have the necessary resources to craft this Card 😅'
      );
      return {
        success: false,
        message: 'Insufficient Resources',
      };
    } else {
      console.log('You already possess this Card in your Inventory 😤');
      return {
        success: false,
        message: 'Card already exist in Inventory',
      };
    }
  }

  // Public Methods - (API)

  // -- Inventory Methods --

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @param {Card} selectedCard Is a Template Card used to create a new Card instance
   * @returns If successful, the updated Inventory | Else, error message
   */
  craft(selectedCard) {
    if (
      typeof selectedCard !== 'object' ||
      Object.keys(selectedCard).length === 0
    )
      return {
        success: false,
        message: 'Class Player -> craft(): Wrong Input',
      };
    const craftable = this.#canBeCrafted(selectedCard);
    if (craftable.success) {
      const cardItem = cardFactory(selectedCard);
      if (!cardItem.success) {
        return {
          success: false,
          message: `Class Player -> craft() -> cardFactory(): ${cardItem.message}`,
        };
      }
      console.log(this.removeResources(selectedCard.requirements));
      const addingToInv = this.addCardToInventory(cardItem.card);
      if (addingToInv.success)
        return { success: true, updatedInventory: this.inventory };
      return {
        success: false,
        message:
          'Class Player -> craft() -> addCardToInventory(): Something went wrong',
        addInvErrMessage: addingToInv.message,
      };
    }
    return {
      success: false,
      message: `Class Player -> craft(): ${craftable.message}`,
    };
  }

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @param {Card} selectedCard Is a Template Card used to create a new Card instance
   * @returns {{success: Boolean, message: String , updatedInventory: Array<Card>, totalCards: Number}} If successful, returns the updated Inventory & it's updated length, else returns an error message.
   */
  addCardToInventory(selectedCard) {
    if (this.inventory.length === 0) {
      this.inventory.push(selectedCard);
      console.log('This was the 1st Card which was added to inventory!');
      return {
        success: true,
        updatedInventory: this.inventory,
        totalCards: this.inventory.length,
      };
    }

    console.log('Adding this card to inventory: ', selectedCard);
    this.inventory.push(selectedCard);
    return {
      success: true,
      updatedInventory: this.inventory,
      totalCards: this.inventory.length,
    };
  }

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @param {Card} selectedCard Is a Template Card used to create a new Card instance
   * @returns {{success: Boolean, message: String , updatedInventory: Array<Card>, totalCards: Number}} If successful, returns the updated Inventory & it's updated length, , else returns an error message.
   */
  removeCardFromInventory(selectedCard) {
    const { index, success } = this.#existsIn(selectedCard, this.inventory);
    if (success) {
      this.inventory.splice(index, 1);
      return { success: true, updatedInventory: this.inventory };
    }
    return {
      success: false,
      message: 'Class Player: Could not remove Card from Inventory',
    };
  }

  // -- Marketplace Methods --

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @param {Card} selectedCard Is a Template Card used to create a new Card instance
   * @returns {{success: Boolean, message: String , updatedMarketplace: Array<Card>, totalCards: Number}} If successful, returns the updated Marketplace & it's updated length, else returns an error message.
   */
  addCardToMarketplace(selectedCard) {
    const { success } = this.removeCardFromInventory(selectedCard);
    if (success) {
      this.marketplace.push(selectedCard);
      return { success: true, updatedMarketplace: this.marketplace };
    }
    return {
      success: false,
      message: 'Class Player: Could not add Card to Marketplace',
    };
  }

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @param {Card} selectedCard Is a Template Card used to create a new Card instance
   * @returns {{success: Boolean, message: String , updatedMarketplace: Array<Card>, totalCards: Number}} If successful, returns the updated Marketplace & it's updated length, , else returns an error message.
   */
  removeCardFromMarketplace(selectedCard) {
    const { index, success } = this.#existsIn(selectedCard, this.marketplace);
    if (success) {
      this.marketplace.splice(index, 1);
      this.inventory.push(selectedCard);
      return {
        success: true,
        updatedMarketplace: this.marketplace,
      };
    }
    return {
      success: false,
      message: 'Class Player: Could not remove Card from Marketplace',
    };
  }

  // -- Resources Methods --

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @param {{resource1: number, resource2: number, resource3: number}} resourcesObj An Object containing the resources that will be given to the Player
   * @returns {{ success: boolean, newResources: {}, oldResources: {}, message: string }} If successful, returns the updated Resources & the old Resources, else returns an error message.
   */
  addResources(resourcesObj) {
    if (Object.keys(resourcesObj).length === 0 && !typeof 'object')
      return {
        success: false,
        message: 'Class Player -> addResources(): Wrong Input',
      };
    const oldResources = { ...this.resources };

    // TODO: Instruction: Use A array of legal properties and loop @param
    for (const [resource, amount] of Object.entries(resourcesObj)) {
      if (this.resources.hasOwnProperty(resource)) {
        this.resources[resource] += amount;
      } else {
        this.resources[resource] = amount;
      }
    }

    return { success: true, newResources: this.resources, oldResources };
  }

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @param {{resource1: number, resource2: number, etc}} resourcesObj An Object containing the resources that need to be consumed in order to perform an action in the game
   * @returns {{ success: boolean, newResources: {}, oldResources: {}, message: string }} If successful, returns the updated Resources, the old Resources and the Refund (in case the player paid more than required), else returns an error message.
   */
  removeResources(resourcesObj) {
    if (Object.keys(resourcesObj).length === 0 && !typeof 'object')
      return {
        success: false,
        message: 'Class Player -> removeResources(): Wrong Input',
      };
    const oldResources = { ...this.resources };
    let refund = 0;

    // TODO: Instruction: Use A array of legal properties and loop @param
    for (const [resource, amount] of Object.entries(resourcesObj)) {
      if (!this.resources.hasOwnProperty(resource)) {
        return {
          success: false,
          message:
            'Class Player -> removeResources() -> forLoop: This Resource does NOT exist',
        };
      } else {
        const result = this.resources[resource] - amount;
        if (result < 0) {
          this.resources[resource] = 0;
          refund = Math.abs(result);
        } else {
          this.resources[resource] = result;
        }
      }
    }

    return {
      success: true,
      newResources: this.resources,
      oldResources,
      refund,
    };
  }

  levelUpCard(selectedCard) {
    const filterArray = this.inventory.filter(
      (card) => card.id === selectedCard.id
    );
    if (!filterArray.length)
      return {
        success: false,
        message: 'You dont have this Card in your inventory',
      };
    if (filterArray.length >= 2)
      return {
        success: false,
        message:
          'For some weird reason, you have more than 1 Card with the same ID...',
      };

    const requiredResources = selectedCard.requirements;
    const {
      success,
      message: levelUpMessage,
      level,
    } = selectedCard.levelUp(this.getCurrentResources);

    if (!success)
      return {
        success: false,
        message: `Class Player -> levelUpCard(): ${levelUpMessage}`,
      };

    console.log('Did Card leveled up Successfully: ', success);
    console.log("Card's New Level: ", level);

    console.log(this.removeResources(requiredResources));

    return { success: true };
  }

  // -- Rank Method --

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @param {number} newRank The new player's Rank
   * @returns If successful, the new Rank & the previous Rank | Else returns an error message.
   */
  updateRank(newRank) {
    if (typeof newRank === 'number') {
      const prevRank = this.rank;
      this.rank = newRank;
      return {
        success: true,
        newRank: this.rank,
        prevRank,
      };
    }
    return {
      success: false,
      message: 'Class Player -> updateRank(): Wrong Input',
    };
  }

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @param {number} points The number of points to be added to the player
   * @returns If successful, the updatedRankPoints & oldRankPoints | Else, error message
   */
  addRankPoints(points) {
    if (typeof points === 'number') {
      const oldRankPoints = this.rankPoints;
      this.rankPoints += points;
      return {
        success: true,
        updatedRankPoints: this.rankPoints,
        oldRankPoints,
      };
    }
    return {
      success: false,
      message: 'Class Player -> addRankPoints(): Wrong Input',
    };
  }

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @param {number} points The number of points to be removed from the player
   * @returns If successful, the updatedRankPoints & oldRankPoints | Else, error message
   */
  removeRankPoints(points) {
    if (typeof points === 'number') {
      const oldRankPoints = this.rankPoints;
      if (points > this.rankPoints) {
        return {
          success: false,
          message:
            '`Class Player -> removeRankPoints(): Subtraction result can not be negative. Provide less points',
          forZeroPoints: this.rankPoints,
        };
      } else {
        this.rankPoints -= points;
        return {
          success: true,
          updatedRankPoints: this.rankPoints,
          oldRankPoints,
        };
      }
    }
    return {
      success: false,
      message: 'Class Player -> removeRankPoints(): Wrong Input',
    };
  }

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @param {number} id The identifier of the Alliance the player belongs to.
   * @returns If successful, the new Alliance & old Alliance | Else, error message
   */
  updateAlliance(id) {
    if (typeof points === 'number') {
      const oldAlliance = this.alliance;
      this.alliance = id;
      return { success: true, newAlliance: this.alliance, oldAlliance };
    }
    return {
      success: false,
      message: 'Class Player -> updatedAlliance(): Wrong Input',
    };
  }

  /**
   * 🧪 Testing Stage: Completed Simple Testing
   * @param {boolean} choice True to enable access, False to disable access.
   * @returns If successful, the updated MPAccess & previous MPAccess | Else, error message
   */
  enableMPAccess(choice) {
    if (typeof action === 'boolean') {
      const previous = this.accessToMP;
      this.accessToMP = choice;
      return { success: true, updatedMPAccess: this.accessToMP, previous };
    }
    return {
      success: false,
      message: 'Class Player -> updateAlliance(): Wrong Input',
    };
  }

  // Getters & Setters - @Notes: to access a getter/setter method, do NOT use "()",
  // eg. Getters: player1.getCurrentInventory returns the Inventory Array
  // eg. Setters: player1.enableMPAccess = true, modifies the accessToMP private field
  get getCurrentInventory() {
    return this.inventory;
  }

  get getCurrentMarketplace() {
    return this.marketplace;
  }

  get getCurrentResources() {
    return this.resources;
  }

  get getCurrentRank() {
    return this.rank;
  }

  get canIaccessMP() {
    return this.accessToMP;
  }

  get getAlliance() {
    return this.alliance;
  }

  // if (typeof action == "string" && action.includes("-")) {
  //   const actionIndex = action.indexOf("-");
  //   const typeOfAction = action.substring(actionIndex + 1);
  //   if (action.includes("card"))
  //     switch (typeOfAction.toLowerCase()) {
  //       case "creation":
  //         this.rankPoints += points
  //         break;
  //       case "levelup":
  //         break;
  //       default:
  //         break;
  //     }
  //   if (action.includes("achievement"))
  //   switch (typeOfAction.toLowerCase()) {
  //     case "research":
  //       break;
  //     case "activation":
  //       break;
  //     case "marketplace ":
  //       break;

  //     default:
  //       break;
  //   }
  // }

  // Utils
  /**
   *
   * @param {Card} cardElement The Card object we wish to modify
   * @returns {Boolean} true | false
   */
  // #idManager(cardElement, index, action) {
  //   if (typeof this.inventory[index].id === "number") {
  //     const tempNumber = this.inventory[index].id;
  //     console.log("1: ", tempNumber);
  //     this.inventory[index].id = [tempNumber, cardElement.id];
  //     console.log("2: ", this.inventory[index].id);

  //     // this.inventory[index].id.push(tempNumber, cardElement.id);
  //     // console.log("3: ", this.inventory[index].id);

  //     return { success: true, newIdArray: this.inventory[index].id };
  //   }
  //   if (this.inventory[index].id instanceof Array) {
  //     if (action === "add") {
  //       this.inventory[index].id = [
  //         ...this.inventory[index].id,
  //         cardElement.id,
  //       ];
  //       console.log(this.inventory[index].id);
  //       console.log(...this.inventory[index].id);
  //       console.log(cardElement.id);
  //       return { success: true, newIdArray: this.inventory[index].id };
  //     }
  //     if (action === "remove") {
  //       this.inventory[index].id.splice(index, 1);
  //       return { success: true, newIdArray: this.inventory[index].id };
  //     }
  //     return {
  //       success: false,
  //       message: "Class Player -> #IdManager: Wrong Input! Developers fault!",
  //     };
  //   }
  //   return {
  //     success: false,
  //     message: "Class Player -> #IdManager: Something went wrong :(",
  //   };
  // }

  // #hasDuplicates(cardElement) {
  //   for (let i = 0; i < this.inventory.length; i += 1) {
  //     console.log(cardElement);
  //     console.log(cardElement.cardId);
  //     if (this.inventory[i].cardId === cardElement.cardId) {
  //       return { success: true, index: i };
  //     }
  //   }
  //   return { success: false };
  // }
}
