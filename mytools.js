const fs = require('fs');
const input = process.argv.slice(2);
const Controller = require('./controllers');

const [logFilePath, firstFlag, firstFlagInfo, secondFlag, secondFlagInfo] = input;

const help = logFilePath == '' || logFilePath == 'help' || logFilePath == '-h' || !firstFlag;

if (help) {
  Controller.help();
} else {
  Controller.convert(logFilePath, firstFlagInfo, secondFlagInfo);
}
