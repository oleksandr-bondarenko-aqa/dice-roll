const config = require("../helpers/config.js")
const {rollTheDice, calculatePercentages, checkDeviation} = require("../helpers/dices.helper");

const {timesToRoll, diceQuantity} = config;
describe(`Roll ${diceQuantity} dice ${timesToRoll} times`,() => {
    const testData = [];

    diceQuantity.forEach((dice) => {
        timesToRoll.forEach((rolls) => {
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