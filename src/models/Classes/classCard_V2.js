export default class Card {
  // Output
  #levelMultiplier = {
    1: 0,
    2: 0.2,
    3: 0.5,
    4: 1,
    5: 2,
  };
  #rarityMultiplier = {
    1: 0,
    2: 0.1,
    3: 0.25,
    4: 0.75,
    5: 1.5,
  };

  // Requirements
  #levelReqMulti = {
    1: 0.2,
    2: 0.75,
    3: 1.25,
    4: 2.25,
    5: 5,
  };
  #upgradeCoef = {
    1: 0,
    2: 0.1,
    3: 0.25,
    4: 0.5,
    5: 0.75,
  };
  /**
   * @param {{}} dataObj The Specifications for creating a Card instance.
   */
  constructor(dataObj, templateData, newCard = false) {
    console.log('Class_V2::Data Object constructor: ', dataObj);
    console.log('Class_V2::Data templateData: ', templateData);
    // These 3 properties exists in all Card
    this.id = dataObj.id; // This is UNIQUE, to match the NFT AND also an Array!!!
    this.templateId = dataObj.templateId; // NOT unique, for eg: 2 Wind Turbine Cards will have the same templateId
    this.rarity = dataObj.rarity;
    this.priceTag = dataObj?.priceTag;
    this.forSale = !!dataObj?.in_mp;

    if (newCard) {
      this.creationTime = Date.now();
      this.creator = dataObj.creator;
    } else {
      this.creationTime = dataObj.creationTime;
      this.creator = dataObj.creator;
    }

    //@Note: When Refactoring, consider splitting into different classes
    if (templateData.type === 'Special Effect') {
      // -- Special Effect --
      // From dataObj
      this.state = dataObj.state ? true : false; // True: Active, False: Inventory
      this.disabled = dataObj.disabled; // No idea why this is here
      this.name = templateData.name;
      // this.endDate = dataObj.endDate ??= 0;
      this.endDate = this.#unixConverter(dataObj.endDate);
      this.usedFrom = dataObj.usedFrom;
      this.ownerId = dataObj.ownerId;

      // From TemplateData
      this.type = templateData.type;
      this.img = templateData.img;

      // Methods
      this.activate = this.activate;
      this.setOwner = this.setOwner;
      this.disable = this.disable;

      if (newCard === true) {
        this.state = false; // True: Active, False: Inventory
        this.disabled = false; // When true, means the card has been used already
        this.rarity = this.#generateRarityLevel();
      }

      this.output = this.#updateObjectValuesV1_SE(templateData.baseOutput);
      // SE Cards don't have levels
      this.requirements = templateData.baseRequirements;
      this.desc = templateData.desc.replace(
        '??',
        ((this.output.boost - 1) * 100).toFixed(0)
      );
    } else {
      // -- Buildings & REGs --

      this.level = dataObj.level; // SE Card dont have levels
      this.state = dataObj.state; // True: Active, False: Inventory
      this.disabled = dataObj.disabled; // No idea why this is here
      this.ownerId = dataObj.ownerId;
      this.stats = dataObj?.stats; // Is undefined for some Cards

      if (newCard === true) {
        // Override the following properties
        this.level = 1;
        this.state = false; // True: Active, False: Inventory
        this.disabled = false; // No idea why this is here
        this.rarity = this.#generateRarityLevel();
        this.stats = templateData?.baseStats;
      }

      // from Template ID
      this.name = templateData.name;
      this.type = templateData.type;
      this.desc = templateData.desc;
      this.img = templateData.img;

      // Calculated Props
      this.output = this.#updateObjectValuesV1(templateData.baseOutput); // + Rarity, + level
      this.maintenance = this.#updateObjectValuesV2(
        templateData.baseMaintenance
      ); // + Level
      this.requirements = this.#updateObjectValuesV2(
        templateData.baseRequirements
      ); // +level

      // Methods, for some reason I have to force them into the instance ???
      this.levelUp = this.levelUp;
      this.activate = this.activate;
      this.deactivate = this.deactivate;
      this.setOwner = this.setOwner;
      this.updateStats = this.updateStats;
      this.disable = this.disable;

      if (newCard === true) {
        console.log('The Newly Created Card!: ', this);
      }
    }
    console.log('The Created Card!: ', this);
  }

  /*
      this.id = dataObj.id;
      this.templateId
      this.rarity
      this.usedFrom
      this.level = 1;
      this.state = false; // True: Active, False: Inventory
      this.disabled = true; // No idea why this is here
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

  levelUp() {
    if (this.level === 5) return console.log('Max Level Reached!');
    this.level += 1;
    this.output =
      this.templateId === 13
        ? this.output
        : this.#updateObjectValuesV1(this.output); // + Rarity, + level
    // this.output = this.#updateObjectValuesV1(this.output);
    this.maintenance = this.#updateObjectValuesV2(this.maintenance);
    this.requirements = this.#updateObjectValuesV2(this.requirements);
  }
  activate() {
    this.state = true;
  }
  deactivate() {
    this.state = false;
  }
  setOwner(newOwnerId) {
    this.ownerId = newOwnerId;
  }

  updateStats(statsObj) {
    this.stats = statsObj;
  }
  disable() {
    this.disabled = true;
  }

  // Private Methods
  #roundToDecimal(number, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(number * factor) / factor;
  }

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

  // For Calc Output (Buildings & REGs)
  #updateObjectValuesV1(baseValueObject) {
    const updatedVersion = {};

    for (const key in baseValueObject) {
      if (Object.hasOwnProperty.call(baseValueObject, key)) {
        updatedVersion[key] = this.#roundToDecimal(
          baseValueObject[key] *
            (this.#levelMultiplier[`${this.level}`] +
              this.#rarityMultiplier[`${this.rarity}`] +
              1),
          2
        );
      }
      return updatedVersion;
    }
  }

  // For Calc Requirements (Buildings & REGs)
  #updateObjectValuesV2(baseValueObject) {
    console.log('Base Requirements: ', baseValueObject);
    const updatedVersion = {};
    const multiplier =
      Number(this.#levelReqMulti[`${this.level}`]) -
      Number(this.#upgradeCoef[`${this.level}`]) +
      1;
    for (const key in baseValueObject) {
      if (Object.hasOwnProperty.call(baseValueObject, key)) {
        updatedVersion[key] = this.#roundToDecimal(
          Number(baseValueObject[key]) * multiplier,
          2
        );
      }
    }
    console.log('Updated Requirements: ', updatedVersion);

    return updatedVersion;
  }

  // For Calc Output (Special Effect)
  #updateObjectValuesV1_SE(baseValueObject) {
    const updatedVersion = {};

    for (const key in baseValueObject) {
      if (Object.hasOwnProperty.call(baseValueObject, key)) {
        updatedVersion[key] = this.#roundToDecimal(
          baseValueObject[key] + (this.#rarityMultiplier[`${this.rarity}`] + 1),
          2
        );
      }
      return updatedVersion;
    }
  }

  #unixConverter(mysqlDatetime) {
    if (mysqlDatetime === null || mysqlDatetime === undefined) return 0;
    const localDatetime = mysqlDatetime.slice(0, 19);
    const date = new Date(localDatetime);

    console.log('(1) - UnixConverter: ', mysqlDatetime);
    console.log('(2) - UnixConverter: ', localDatetime);
    console.log('(3) - UnixConverter: ', date);
    console.log('(4) - UnixConverter: ', date.getTime());
    // return Math.floor(date.getTime() / 1000);
    return date.getTime();
  }
}
