const superagent = require("superagent");

module.exports = {
    async rollOneDice(howManyTimes) {
        let ones = [],
            twos = [],
            threes = [],
            fours = [],
            fives = [],
            sixes = [];

        for (let i = 0; i < howManyTimes; i++) {
            superagent.get('https://www.random.org/integers/?num=100&min=1&max=6&col=2&base=10&format=plain&rnd=new')
                .then(response => {
                    let numbers = JSON.stringify(response.text);
                    for (let j = 0; j < numbers.length; j++) {
                        switch (numbers[j]) {
                            case '1':
                                ones.push(numbers[j]);
                                break;
                            case '2':
                                twos.push(numbers[j]);
                                break;
                            case '3':
                                threes.push(numbers[j]);
                                break;
                            case '4':
                                fours.push(numbers[j]);
                                break;
                            case '5':
                                fives.push(numbers[j]);
                                break;
                            case '6':
                                sixes.push(numbers[j]);
                                break;
                        }
                    }

                    return [
                        ones.length,
                        twos.length,
                        threes.length,
                        fours.length,
                        fives.length,
                        sixes.length
                    ];
                }).then(result => {
                let sumAll = result.reduce((a, b) => a + b, 0);

                let percentOnes = (100 * result[0]) / sumAll;
                let percentTwos = (100 * result[1]) / sumAll;
                let percentThrees = (100 * result[2]) / sumAll;
                let percentFours = (100 * result[3]) / sumAll;
                let percentFives = (100 * result[4]) / sumAll;
                let percentSixes = (100 * result[5]) / sumAll;

                console.log(`One Dice was rolled ${howManyTimes * 100} times, the statistics is:
                         1 was rolled ${result[0]} times which is ${percentOnes.toFixed(2)}%
                         2 was rolled ${result[1]} times which is ${percentTwos.toFixed(2)}%
                         3 was rolled ${result[2]} times which is ${percentThrees.toFixed(2)}%
                         4 was rolled ${result[3]} times which is ${percentFours.toFixed(2)}%
                         5 was rolled ${result[4]} times which is ${percentFives.toFixed(2)}%
                         6 was rolled ${result[5]} times which is ${percentSixes.toFixed(2)}%`);
            })
        }
    },

    async rollTwoDices(howManyTimes) {
        let twos = [],
            threes = [],
            fours = [],
            fives = [],
            sixes = [],
            sevens = [],
            eights = [],
            nines = [],
            tens = [],
            elevens = [],
            twelves = [];

        for (let i = 0; i < howManyTimes; i++) {
            superagent.get('https://www.random.org/integers/?num=100&min=1&max=6&col=2&base=10&format=plain&rnd=new')
                .then(response => {
                    let numbersUnfiltered = JSON.stringify(response.text);
                    let stringNumbers = [];
                    for (let i = 0; i < numbersUnfiltered.length; i++) {
                        if (numbersUnfiltered[i] === '1' ||
                            numbersUnfiltered[i] === '2' ||
                            numbersUnfiltered[i] === '3' ||
                            numbersUnfiltered[i] === '4' ||
                            numbersUnfiltered[i] === '5' ||
                            numbersUnfiltered[i] === '6')
                        {
                            stringNumbers.push(numbersUnfiltered[i]);
                        }
                    }

                    let numbers = stringNumbers.map(string => {
                        return parseInt(string, 10);
                    })

                    let counter = 0;
                    let twoDicesSum = numbers.reduce((acc, curr) => {
                        if (counter === 0) {
                            acc.push(curr);
                            counter++;
                        } else {
                            acc[acc.length - 1] += curr;
                            counter = 0;
                        }
                        return acc;
                    }, []);

                    for (let j = 0; j < twoDicesSum.length; j++) {
                        switch (twoDicesSum[j]) {
                            case 2:
                                twos.push(twoDicesSum[j]);
                                break;
                            case 3:
                                threes.push(twoDicesSum[j]);
                                break;
                            case 4:
                                fours.push(twoDicesSum[j]);
                                break;
                            case 5:
                                fives.push(twoDicesSum[j]);
                                break;
                            case 6:
                                sixes.push(twoDicesSum[j]);
                                break;
                            case 7:
                                sevens.push(twoDicesSum[j]);
                                break;
                            case 8:
                                eights.push(twoDicesSum[j]);
                                break;
                            case 9:
                                nines.push(twoDicesSum[j]);
                                break;
                            case 10:
                                tens.push(twoDicesSum[j]);
                                break;
                            case 11:
                                elevens.push(twoDicesSum[j]);
                                break;
                            case 12:
                                twelves.push(twoDicesSum[j]);
                                break;
                        }
                    }

                    return [
                        twos.length,
                        threes.length,
                        fours.length,
                        fives.length,
                        sixes.length,
                        sevens.length,
                        eights.length,
                        nines.length,
                        tens.length,
                        elevens.length,
                        twelves.length
                    ];
                }).then(result => {
                let sumAll = result.reduce((acc, curr) => acc + curr, 0);

                let percentTwos = (100 * result[0]) / sumAll;
                let percentThrees = (100 * result[1]) / sumAll;
                let percentFours = (100 * result[2]) / sumAll;
                let percentFives = (100 * result[3]) / sumAll;
                let percentSixes = (100 * result[4]) / sumAll;
                let percentSevens = (100 * result[5]) / sumAll;
                let percentEights = (100 * result[6]) / sumAll;
                let percentNines = (100 * result[7]) / sumAll;
                let percentTens = (100 * result[8]) / sumAll;
                let percentElevens = (100 * result[9]) / sumAll;
                let percentTwelves = (100 * result[10]) / sumAll;

                console.log(`Two Dices were rolled ${howManyTimes * 100} times, the statistics is:
                         2 was rolled ${result[0]} times which is ${percentTwos.toFixed(2)}%
                         3 was rolled ${result[1]} times which is ${percentThrees.toFixed(2)}%
                         4 was rolled ${result[2]} times which is ${percentFours.toFixed(2)}%
                         5 was rolled ${result[3]} times which is ${percentFives.toFixed(2)}%
                         6 was rolled ${result[4]} times which is ${percentSixes.toFixed(2)}%
                         7 was rolled ${result[5]} times which is ${percentSevens.toFixed(2)}%
                         8 was rolled ${result[6]} times which is ${percentEights.toFixed(2)}%
                         9 was rolled ${result[7]} times which is ${percentNines.toFixed(2)}%
                         10 was rolled ${result[8]} times which is ${percentTens.toFixed(2)}%
                         11 was rolled ${result[9]} times which is ${percentElevens.toFixed(2)}%
                         12 was rolled ${result[10]} times which is ${percentTwelves.toFixed(2)}%`);
            })
        }
    }
}

