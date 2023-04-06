export default class Card {
  // #levelMultiplier = {
  //   1: 1,
  //   2: 1.2,
  //   3: 1.5,
  //   4: 2,
  //   5: 3,
  // };
  // #rarityMultiplier = {
  //   1: 1,
  //   2: 1.1,
  //   3: 1.25,
  //   4: 1.75,
  //   5: 2.5,
  // };
  // #upgradeCoef = {
  //   1: 0,
  //   2: 0.1,
  //   3: 0.25,
  //   4: 0.5,
  //   5: 0.75,
  // };
  /**
   * @param {{}} dataObj The Specifications for creating a Card instance.
   */
  constructor(templateData, templateId) {
    this.name = templateData.name;
    this.templateId = templateId;
    this.type = templateData.type;
    this.desc = templateData.desc;
    this.img = templateData.img;
    this.requirements = templateData.baseRequirements;
    this.maintenance = templateData.baseMaintenance;
    this.output = templateData.baseOutput;
    this.stats = templateData.baseStats;
    /*
    this.id = dataObj.id; // This is UNIQUE, to match the NFT AND also an Array!!!
    this.templateId = dataObj.templateId; // NOT unique, for eg: 2 Wind Turbine Cards will have the same templateId
    this.rarity = dataObj.rarity;
    this.level = dataObj?.level; // SE Card dont have levels
    this.usedFrom = dataObj?.usedFrom; // Only SE Card have this, an arr that holds the ID of the owners who have used it
    this.state = dataObj.state; // True: Active, False: Inventory
    this.locked = dataObj.locked; // No idea why this is here
    this.owner = dataObj.owner;
    this.stats = dataObj?.stats; // Is undefined for some Cards

    if (newCard) {
      // Override the following properties
      this.level = 1;
      this.state = false; // True: Active, False: Inventory
      this.locked = true; // No idea why this is here
    }

    // from Template ID
    this.name = templateData.name;
    this.type = templateData.type;
    this.desc = templateData.desc;
    this.img = templateData.img;
    this.output = this.#updateObjectValuesV1(templateData.baseOutput); // + Rarity, + level
    this.maintenance = this.#updateObjectValuesV2(templateData.baseMaintenance); // + Level
    this.requirements = this.#updateObjectValuesV2(
      templateData.baseRequirements
    ); // +level
    */
  }

  /*
      this.id = dataObj.id;
      this.templateId
      this.rarity
      this.usedFrom
      this.level = 1;
      this.state = false; // True: Active, False: Inventory
      this.locked = true; // No idea why this is here
      this.owner = ;
      this.stats = ;
      this.name = templateData.name;
      this.type = templateData.type;
      this.desc = templateData.desc;
      this.img = templateData.img;
      this.output = this.#updateObjectValuesV1(templateData.baseOutput); // + Rarity, + level
      this.maintenance = this.#updateObjectValuesV2(
        templateData.baseMaintenance
      ); // + Level
      this.requirements = this.#updateObjectValuesV2(
        templateData.baseRequirements
      ); // +level
  */

  // Public API
  /*
  levelUp() {
    if (this.level === 5) return console.log('Max Level Reached!');
    this.level += 1;
    this.output = this.#updateObjectValuesV1(templateData.baseOutput);
    this.maintenance = this.#updateObjectValuesV2(templateData.baseMaintenance);
    this.requirements = this.#updateObjectValuesV2(
      templateData.baseRequirements
    );
  }
  activate() {
    // if (this.usedFrom === undefined)
    // Do sth
    this.state = true;
  }
  deactivate() {
    this.state = false;
  }
  setOwner(newOwner) {
    this.owner = newOwner;
  }

  updateStats(statsObj) {
    this.stats = statsObj;
  }
  // Private Methods
  // #calcOutput(_templateData) {
  //   this.output = this.#updateObjectValuesV1(_templateData.baseOutput);
  // }

  // #calcMaintenance(_templateData) {
  //   this.maintenance = this.#updateObjectValuesV2(
  //     _templateData.baseMaintenance
  //   );
  // }

  // #calcRequirements(_templateData) {
  //   this.requirements = this.#updateObjectValuesV2(
  //     _templateData.baseRequirements
  //   );
  // }
  #generateRarityLevel() {
    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
      return 1; // common 50%
    } else if (randomNumber < 0.7) {
      return 2; // special 30%
    } else if (randomNumber < 0.88) {
      return 3; // rare 15%
    } else if (randomNumber < 0.96) {
      return 4; // mythic 5%
    } else {
      return 5; // legendary
    }
  }

  #updateObjectValuesV1(baseValueObject) {
    const updatedVersion = {};
    for (const key in baseValueObject) {
      if (Object.hasOwnProperty.call(baseValueObject, key)) {
        updatedVersion[key] =
          baseValueObject[key] *
          (this.#levelMultiplier[`${this.level}`] +
            this.#rarityMultiplier[`${this.level}`]);
      }
      return updatedVersion;
    }
  }

  #updateObjectValuesV2(baseValueObject) {
    const updatedVersion = {};
    const multiplier =
      Number(this.#levelMultiplier[`${this.level}`]) -
      Number(this.#upgradeCoef[`${this.level}`]);
    for (const key in baseValueObject) {
      if (Object.hasOwnProperty.call(baseValueObject, key)) {
        updatedVersion[key] = Number(Number(baseValueObject[key]) * multiplier);
      }
    }
    return updatedVersion;
  }
  */
}
