const fs = require('fs');

class Controller {
  static help() {
    let commands = [
      'node mytools or node my tools help or node mytools -h to show available commands',
      'node mytools -t <json/>text> to convert log file and save it',
      'node mytools -t <json/text> -o <output file path> to convert log file and save it to specific path',
    ];

    commands = commands.join('\n');
    console.log(commands);
  }

  static async convert(logFilePath, fileType, outputPath) {
    fs.readFile(logFilePath, 'utf8', (err, data) => {
      if (err) throw err;

      if (fileType == 'text' || !fileType) {
        if (!outputPath) outputPath = './output.txt';

        fs.writeFile(outputPath, data, (err) => {
          if (err) throw err;
          console.log('The file has been saved as text file!');
        });
      } else if (fileType == 'json') {
        data = data.split('\n');
        let dataArray = [];
        for (let i = 0; i < data.length; i++) {
          if (!data[i]) {
            continue;
          }
          let tempArray = [];
          tempArray = data[i].split(',');
          dataArray.push(tempArray);
        }

        let json = {};
        let number = 1;
        dataArray.forEach((el1) => {
          let tempJSON = {};
          el1.forEach((el2) => {
            tempJSON['log'] = el2;
          });
          json[number] = tempJSON;
          number++;
        });

        if (!outputPath) outputPath = './output.json';
        fs.writeFile(outputPath, JSON.stringify(json, null, 2), 'utf8', (err) => {
          if (err) throw err;
          console.log('The file has been saved as JSON file!');
        });
      }
    });
  }
}

module.exports = Controller;
