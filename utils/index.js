const {
    readFileSync, existsSync, createWriteStream
} = require('fs');
const { cwd, env } = require('process')
const https = require('https');


// get input
function readInput(path) {
    return readFileSync(path, 'utf-8');
}
/**
 * 
 * @param {number} size 
 * @param {number} startAt 
 * @returns 
 */
function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}
/**
 * Donwloads the file located at `url` and writes it to `dest`, if a SESSION_COOKIE env variable is present, uses it.
 * @param {string} url 
 * @param {string} dest 
 */
async function dlFile(url, dest) {
    let httpsOptions = {}
    if(env.SESSION_COOKIE && env.SESSION_COOKIE.length > 0){
        httpsOptions = {
            headers : {
                Cookie : env.SESSION_COOKIE
            }
        }
    }
    return https.get(url, httpsOptions, (res) => {
        // Image will be stored at this path
        const filePath = createWriteStream(dest);
        res.pipe(filePath);
        filePath.on('finish', () => {
            filePath.close();
            console.log(`${url} downloaded into ${dest}`);
            return dest;
        });
    }).on('error', (e) => {
        console.error(`error ${e}`)
        return false;
    })
}
/**
 * 
 * @param {number} day 
 * @return boolean
 */
function isInputPresent(day){
    if(existsSync(pathForDay(day))){
        return true;
    }
    return false;
}

function pathForDay(day){
    return `${cwd()}/day${day}/input.txt`;
}

module.exports = {
    readInput,
    range,
    dlFile,
    isInputPresent,
    pathForDay
}