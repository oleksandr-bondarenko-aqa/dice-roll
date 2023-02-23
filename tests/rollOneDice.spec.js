const {rollTheDice} = require("../helpers/dices.helper.js");

describe('Roll dices 1000, 5000, 10000 times',() => {
    it('Roll 1 dice 1000 times', async () => {
        await rollTheDice(1, 1000);
    });

    it('Roll 1 dice 5000 times', async () => {
        await rollTheDice(1, 5000);
    });

    it('Roll 1 dice 10000 times', async () => {
        await rollTheDice(1, 10000);
    });

    it('Roll 2 dice 1000 times', async () => {
        await rollTheDice(2, 1000);
    });

    it('Roll 2 dice 5000 times', async () => {
        await rollTheDice(2, 5000);
    });

    it('Roll 2 dice 10000 times', async () => {
        await rollTheDice(2, 10000);
    });

    it('Roll 3 dice 7777 times', async () => {
        await rollTheDice(3, 7777);
    });

    it('Roll 4 dice 179 times', async () => {
        await rollTheDice(4, 179);
    });

    it('Roll 5 dice 8888 times', async () => {
        await rollTheDice(5, 8888);
    });

    it('Roll 5 dice 10000 times', async () => {
        await rollTheDice(5, 10000);
    });
});