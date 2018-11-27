function proccessSimpleDiceString(diceString: string): Array<string>{
    return diceString.split("d");
}

function transformDiceArrayIntoNumbers(diceNumbers: Array<string>): Array<number>{
    return diceNumbers.map(e => parseInt(e));
}

function rollDiceBasedOnNumberedInputs(diceNumbers: Array<number>): Array<number>{
    let rolls = Array.apply(null, Array(diceNumbers[0])).map(Number.prototype.valueOf,0);
    return rolls.map(number => Math.floor(Math.random() * diceNumbers[1]) + 1);
}

function countTheRoll(rolls: Array<number>): number{
    return rolls.reduce((total, roll) => total + roll)
}

export function RollADice(input){
    let rawNumberInputs = proccessSimpleDiceString(input);
    let finalDiceNumbers = transformDiceArrayIntoNumbers(rawNumberInputs);
    let rolls = rollDiceBasedOnNumberedInputs(finalDiceNumbers); 
    let roll = countTheRoll(rolls)
   return roll;
}