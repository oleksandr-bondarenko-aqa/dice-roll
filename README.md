# This is a test task solution

## DICE ROLL

# Objective:
To check the following hypothesis: "For large number of rolls (number of rolls > 1000) distribution of dice points strives to uniform distribution."

# Requirements:
* Language - JavaScript
* Create tests(using REST API by https://www.npmjs.com/package/superagent) for:
GET: https://www.random.org/integers/?num=1&min=1&max=1&col=1&base=10&format=plain&rnd=new
* Tests should check that maximum deviation of dice results is within 5% First test: for 1 dice Second test: for 2 dices (total roll points is a sum of 2 dices)
* Try 1000, 5000, 10000 number of rolls and see how distribution changes

# How to run tests:
* Install all required packages:
```npm install```
* To run tests as is:
```npm run test```
* Or you can modify config.js file to run different dice quantity and roll times