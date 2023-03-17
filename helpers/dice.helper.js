const superagent = require("superagent");
const expect = require("chai").expect;
const config = require("./config.js");

const {baseUrl, diceMinScore, diceMaxScore, deviationMin, deviationMax} = config;

module.exports = {
    async rollTheDice(howManyDice, howManyTimesToRoll) {
        const sumOfDiceScores = new Array(howManyTimesToRoll).fill(0);

        for (let i = 0; i < howManyDice; i++) {
            const res = await superagent.get(
                `${baseUrl}/integers/?num=${howManyTimesToRoll}&min=${diceMinScore}&max=${diceMaxScore}&col=1&base=10&format=plain&rnd=new`
            );
            const rolls = res.text.trim().split("\n").map(Number);

            rolls.forEach((val, j) => (sumOfDiceScores[j] += val));
        }

        return sumOfDiceScores;
    },

    calculatePercentages(diceScoreArray) {
        const counts = {};
        diceScoreArray.forEach(score => {
            if (counts[score]) {
                counts[score]++;
            } else {
                counts[score] = 1;
            }
        });

        const totalRolls = diceScoreArray.length;
        let output = '';
        const percentages = [];
        Object.keys(counts).sort((a, b) => a - b).forEach(score => {
            const rolls = counts[score];
            const percentage = (rolls / totalRolls * 100).toFixed(2);
            percentages.push(parseFloat(percentage));
            output += `Dice score ${score} rolled ${rolls} times (${percentage}%)\n`;
        });

        console.log(output);
        return percentages;
    },

    checkDeviation(percentagesArray) {
        const sum = percentagesArray.reduce((acc, cur) => acc + cur, 0);
        const avgPercentage = (sum / percentagesArray.length).toFixed(2);
        const minDeviation = (avgPercentage * deviationMin).toFixed(2);
        const maxDeviation = (avgPercentage * deviationMax).toFixed(2);

        let allWithinRange = true;
        for (let percentage of percentagesArray) {
            if (percentage <= minDeviation || percentage >= maxDeviation) {
                allWithinRange = false;
                break;
            }
        }

        if (allWithinRange) {
            console.log(`Average percentage is ${avgPercentage}%, deviation range is ${minDeviation}%-${maxDeviation}%. All percentages are within deviation range.`);
        } else {
            console.log(`Average percentage is ${avgPercentage}%, deviation range is ${minDeviation}%-${maxDeviation}%. Some percentages are beyond the deviation range.`);
        }

        for (let percentage of percentagesArray) {
            expect(Number(percentage)).to.be.at.least(Number(minDeviation));
            expect(Number(percentage)).to.be.at.most(Number(maxDeviation));
        }
    }
}
