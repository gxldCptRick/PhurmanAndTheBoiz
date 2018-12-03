// @flow
function proccessSimpleDiceString(diceString: string): Array<string> {
  if (diceString && diceString.includes("d"))
    return diceString.split("d").filter(e => e !== "");
  else return [diceString || ""];
}

function transformDiceArrayIntoNumbers(
  diceNumbers: Array<string>
): Array<number> {
  if (diceNumbers.length <= 2) return diceNumbers.map(e => parseInt(e));
}

function rollDiceBasedOnNumberedInputs(
  diceNumbers: Array<number>
): Array<number> {
  if (diceNumbers) {
    if (diceNumbers.length === 2) {
      let rolls = Array.apply(null, Array(diceNumbers[0]));
      return rolls.map(() => Math.floor(Math.random() * diceNumbers[1]) + 1);
    } else if (diceNumbers.length === 1) {
      let rolls = [Math.floor(Math.random() * diceNumbers[0]) + 1];
      return rolls;
    }
  }
}

function countTheRoll(rolls: Array<number>): number {
  if (!rolls) return 0;
  return rolls.reduce((total, roll) => total + roll);
}

export function RollADice(input: string) {
  let rawNumberInputs = proccessSimpleDiceString(input);
  let finalDiceNumbers = transformDiceArrayIntoNumbers(rawNumberInputs);
  let rolls = rollDiceBasedOnNumberedInputs(finalDiceNumbers);
  let roll = countTheRoll(rolls);
  return {
    allTheDiceRolls: rolls || [],
    totalAmount: roll
  };
}
