import fs = require("fs");

const logsDir = './src/logger/logs';

if (!fs.existsSync(logsDir)) {

    fs.mkdirSync(logsDir);
    fs.appendFile(logsDir + '/log.log', '', (err) => {
        console.log(err);
    })
}
// define the time format
function getTime() {
    const now = new Date();
    return now.toUTCString();
}
function doLog(line, level='Debug') {
    line = `${getTime()} - ${level} - ${line}`

    if(process.env.NODE_ENV === 'production') {
    const content = fs.readFileSync('./src/logger/logs/log.log')
    fs.writeFileSync('./src/logger/logs/log.log', content + '\n' + line)
    } else {
    console.log(line);
    }
}
export const logger = {
    debug: (line) => {
        doLog(line, "Debug")
    },
    info: (line) => {
        doLog(line, "Info")
    },
    warn: (line) => {
        doLog(line, "Warn")
    },
    error: (line) => {
        doLog(line, "Error")
    }
};