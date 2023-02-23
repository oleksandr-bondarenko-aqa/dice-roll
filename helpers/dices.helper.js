const superagent = require("superagent");
const {expect} = require("chai");

const DICE_SIDES = 6;

module.exports = {
    async rollTheDice(howManyDice, howManyTimesToRoll) {
        if (howManyDice <= 0) {
            throw new Error('cannot roll 0 or negative dice');
        }

        /* Rolls the dice by GET request (1 or more simultaneously),
        adds dice results (if more than 1 dice), pushes final scores into array `rolls` */

        const rolls = (
            await Promise.all(
                Array.from({ length: howManyDice }, async () => {
                    const res = await superagent.get(
                        `https://www.random.org/integers/?num=${howManyTimesToRoll}&min=1&max=6&col=${howManyDice}&base=10&format=plain&rnd=new`
                    );
                    return res.text
                        .trim()
                        .split("\n")
                        .flatMap((row) =>
                            row.trim().split("\t").map(Number).reduce((sum, roll) => sum + roll, 0)
                        );
                })
            )
        ).flat();

        const totalRolls = rolls.length;

        /* In case we have 1 dice, we expect rolls score to be almost equal
        with deviation no more than 5% */

        if (howManyDice === 1) {
            const rollCounts = new Array(DICE_SIDES).fill(0);
            rolls.forEach(roll => rollCounts[roll - `${howManyDice}`]++);

            const expectedRollsAverage = totalRolls / DICE_SIDES;
            const averageChance = expectedRollsAverage * 100 / totalRolls;
            const deviation = averageChance * 1.025;
            const deviationMax = averageChance + deviation;
            const deviationMin = averageChance - deviation;

            rollCounts.forEach((count, i) => {
                expect(averageChance).to.be.below(deviationMax, `Dice value ${i + howManyDice} deviation is too high`);
                expect(averageChance).to.be.above(deviationMin, `Dice value ${i + howManyDice} deviation is too high`);
                const percentage = count / totalRolls * 100;
                console.log(`Dice score ${i + howManyDice} rolled ${count} times (${percentage.toFixed(2)}%)`);
            })
        }

        /* In case we have 2+ dice, we expect rolls results to be pyramid-like
        where the lowest and the highest score occurs the least frequently,
        whilst middle score is the most probable outcome */

        else {
            const rollCounts = new Array(DICE_SIDES * howManyDice - (howManyDice - 1)).fill(0);
            rolls.forEach(roll => rollCounts[roll - `${howManyDice}`]++);

            const minScoreCount = rollCounts[0];
            const maxScoreCount = rollCounts[rollCounts.length - 1];
            const middleScoreIndex = Math.floor((rollCounts.length - 1) / 2);
            const middleScoreCount = rollCounts[middleScoreIndex];

            rollCounts.forEach((count, i) => {
                expect(minScoreCount).to.be.below(middleScoreCount, 'Min score should be rolled less frequently than middle score');
                expect(maxScoreCount).to.be.below(middleScoreCount, 'Max score should be rolled less frequently than middle score');
                const percentage = count / totalRolls * 100;
                console.log(`Dice score ${i + howManyDice} rolled ${count} times (${percentage.toFixed(2)}%)`);
            })
        }
    }
}



