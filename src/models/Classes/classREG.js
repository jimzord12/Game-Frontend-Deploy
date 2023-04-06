import Card from './classCard_V2.js';
// import { REGTypes } from "./Factories/data";

export default class REG extends Card {
  // constructor(options) {
  //   // console.log("🎇 REG Class Construction says: Can you feel the Power?!");
  //   super(options);
  //   // console.log("🎇 From REG Class: REG's Properties: ", this);
  // }

  buildingMethod() {
    console.log(
      `This method was called from the Card: ${this.name} with ID: ${this.id} `
    );
  }
}
