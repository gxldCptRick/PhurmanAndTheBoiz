// @flow
import chai from "chai";
import * as Dice from "./RollADice";
import mocha from "mocha";
chai.should();

mocha.describe("Roll The Dice Accepts Vaid Dice Strings", function(): void {
  mocha.it(
    "Rolls A Dice Given The String: 'd30'  that has a value between 1 and 30",
    function() {
      Dice.RollADice("d30")
        .totalAmount.should.be.above(0)
        .and.below(31);
    }
  );
  mocha.it(
    "Rolls A Dice Given The String: '30' that has a value between 1 and 30",
    function() {
      Dice.RollADice("30")
        .totalAmount.should.be.above(0)
        .and.below(31);
    }
  );

  mocha.it(
    "Rolls A Dice Given The String: '1d30' that has a value between 1 and 30",
    function() {
      Dice.RollADice("1d30")
        .totalAmount.should.be.above(0)
        .and.below(31);
    }
  );
});
