const config = require("../helpers/config.js")
const {rollTheDice, calculatePercentages, checkDeviation} = require("../helpers/dice.helper");

const {timesToRoll, diceQuantity} = config;

const diceAmount = typeof process.env.DICE_QUANTITY === 'string'
    ? process.env.DICE_QUANTITY.split(',').map(Number) : diceQuantity;
const rollTimes = typeof process.env.TIMES_TO_ROLL === 'string'
    ? process.env.TIMES_TO_ROLL.split(',').map(Number) : timesToRoll;

describe(`Roll ${diceAmount} dice ${rollTimes} times`,() => {
    const testData = [];

    diceAmount.forEach((dice) => {
        rollTimes.forEach((rolls) => {
            testData.push({ dice, rolls });
        });
    });

    testData.forEach(({ dice, rolls }) => {
        it(`Roll ${dice} dice ${rolls} times`, async () => {
            const diceScores = await rollTheDice(dice, rolls);
            const percentages = calculatePercentages(diceScores);
            checkDeviation(percentages);
        });
    });
});