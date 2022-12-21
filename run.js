require('dotenv').config()
const { cwd } = require('process');
const { range, isInputPresent, pathForDay, dlFile } = require('./utils');
var hrMeasureAll = process.hrtime()

const DL_URL = 'https://adventofcode.com/2022/day/##/input'

let myArgs = process.argv.slice(2);
const hasTests = myArgs.includes('-t');
const hasDownloadInput = myArgs.includes('--di')

let results = []

console.table(myArgs)
/**
 * Run all the tests
 */
function runAll() {
    range(25, 1).forEach(runSelected)
}
/**
 * 
 * @param {number} dayNumber 
 */
function runSelected(dayNumber) {
    try {
        if(!isInputPresent(dayNumber)){
            console.log(`input file for day ${dayNumber} not present`);
            if(!hasDownloadInput) {
                console.info("Not Downloading")
                return;
            }
             let file = dlFile(DL_URL.replace('##', dayNumber), pathForDay(dayNumber));

            if(!file){
                return
            }
        }
        var hrMeasureDay = process.hrtime()
        let dayResult = require('./day' + dayNumber)({
            test: hasTests
        });
        const hrMeasureDayEnd = process.hrtime(hrMeasureDay)
        let resultObj = {}
        resultObj["day"] = dayNumber
        if (hasTests) {
            resultObj.test1 = dayResult['test1'];
            resultObj.test2 = dayResult['test2'];
        }
        resultObj["Star1"] = dayResult['s1']
        resultObj["Star2"] = dayResult['s2']
        resultObj['Execution time'] =  '%ss %msms'.split('%s').join(hrMeasureDayEnd[0]).split('%ms').join(hrMeasureDayEnd[1] / 1000000)

        results.push(resultObj);
    } catch (error) {
        if (error.name == 'Error') {
            console.warn("Day " + dayNumber + " not done yet, what are you waiting for?")
        } else {
            console.error(error.name, error);
        }
    }
}

if (myArgs.length > 0) {
    let daysArgs = myArgs.map(parseFloat).filter(Number);
    let info = 'Running' + ((daysArgs.length == 0) ? ' all' : ' '+ daysArgs.length) + ' days' ;
    if (daysArgs.length){
        info+= ': ' +daysArgs;
    }
    if(hasTests) {
        info += ' -- with tests';
    }
    console.log( info);
    if (daysArgs.length > 0) {
        daysArgs.forEach(runSelected);
    } else {
        runAll();
    }
} else {
    runAll();
}
console.table(results);
var hrMeasureAllEnd = process.hrtime(hrMeasureAll)
console.info('Whole execution time (hrMeasure): %ds %dms', hrMeasureAllEnd[0], hrMeasureAllEnd[1] / 1000000)