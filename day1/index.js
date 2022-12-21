const utils = require('../utils');
const testList = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const inputList = utils.readInput(__dirname + '/input.txt')
/**
 * 
 * @param {String} text 
 * @returns Array
 */
function cleanUp(text) {
    return text.replace(/[ ]/g, '').split(/\n\n/)
}
/**
 * 
 * @param {Array<number>} list 
 * @returns number
 */
const maxReducer = function (list) {
    return list.reduce((a, b) => Math.max(a, b))
}
/**
 * 
 * @param {Array<number>} list 
 * @returns number
 */
const sumReducer = function (list) {
    return list.reduce((a, b) => a + b)
}

function star1(list) {
    const summedList = cleanUp(list).map(current => {
        return current.split(/\n/).map(Number).reduce((a, b) => a + b)
    })
    return maxReducer(summedList);
}

function star2(list) {
    const orderedSummedList = cleanUp(list).map(current => {
        return current.split(/\n/).map(Number).reduce((a, b) => a + b)
    }).sort(function(a,b){return b - a}).slice(0, 3)
    console.log(orderedSummedList)
    return sumReducer(orderedSummedList);
}

module.exports = function (options) {
    let ret = {
        "s1": star1(inputList),
        "s2": star2(inputList)
    }
    if (typeof options.test != 'undefined' && options.test) {
        ret.test1 = star1(testList);
        ret.test2 = star2(testList);
    }
    return ret;
}