const utils = require('../utils');

const testString = `A Y
B X
C Z`
/**
 * Calculates the score of a Rock Paper Scissors game
 *  - Rock: A or X (grants 1 point if charB)
 *  - Paper: B or Y (grants 2 points if charB)
 *  - Scissors: C or Z (grants 3 points if charB)
 * 
 * |   	| X 	| Y 	| Z 	|
 * |---	|---	|---	|---	|
 * | A 	| 0 	| 1 	| -1 	|
 * | B 	| -1 	| 0 	| 1 	|
 * | C 	| 1 	| -1 	| 0 	|
 * 
 * @param {string} charA The opponents play
 * @param {string} charB your play
 * @returns the resulting score (0, 3 or 6 for lose, draw, win + 1, 2 or 3 points )
 */
const gameScore = function (charA, charB) {
    const scoreMatrix = [
        [3, 6, 0],
        [0, 3, 6],
        [6, 0, 3]
    ]
    return scoreMatrix[charA.charCodeAt() - 65][charB.charCodeAt() - 88] + charB.charCodeAt() - 87
}
/**
 * 
 * A X => 2
 * A Y => 0
 * A Z => 1
 * B X => 0
 * B Y => 1
 * B Z => 2
 * C X => 1
 * C Y => 2
 * C Z => 0
 * 
 * @param {string} charA The opponents play
 * @param {string} charB your play
 * @returns the resulting score (0, 3 or 6 for lose, draw, win + 1, 2 or 3 points )
 */
const targetOutcome = function () {

}
function star1(input) {
    const dataLines = input.split('\n')
    return dataLines.map(item => {
        // item is a string, hence 0 and 2 are first and third chars
        return gameScore(item[0], item[2])
    }).reduce((a, b) => a + b)
}

function star2(input) {
    return null
}

function isLineValid(line) {
    let splitLine = line.split(' '),
        direction = splitLine[0].trim(),
        amount = splitLine[1];
    for (let index = 0; index < password.length; index++) {
        if (password.charAt(index) == char) {
            charCount++;
            if (charCount > max) {
                return false;
            };
        }
    }
    if (charCount < min) {
        return false;
    }
    return true;
}

function isLetterPositionValid(line) {
    let splitLine = line.split(':'),
        password = splitLine[1].trim(),
        char = splitLine[0].split(' ')[1],
        pos1 = splitLine[0].split(' ')[0].split('-').map(Number)[0] - 1,
        pos2 = splitLine[0].split(' ')[0].split('-').map(Number)[1] - 1;

    if (pos1 < 0 || pos2 < 0) {
        return false;
    }
    if (password.charAt(pos1) == password.charAt(pos2)) {
        return false;
    }
    if (password.charAt(pos1) == char || password.charAt(pos2) == char) {
        return true;
    }
}


var challengeInput = utils.readInput(__dirname + '/input.txt');
module.exports = function (options) {
    let ret = {}
    ret = {
        "s1": star1(challengeInput),
        "s2": star2(challengeInput)
    }
    if (typeof options.test != 'undefined' && options.test) {
        ret.test1 = star1(testString);
        ret.test2 = star2(testString);
    }
    return ret;
}