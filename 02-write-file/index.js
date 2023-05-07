const fs = require('fs');
const path = require('path');
const process = require('process');

let userName;
if (process.env.USERNAME !== undefined) {
  userName = process.env.USERNAME;
} else {
  userName = 'Reviewer';
}
console.log(`Hi ${userName}! Enter text here: \n`);
process.on('exit', () => console.log(`\nBye ${userName}, Have a good day!`));
const writeStream = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));
process.stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  }
  writeStream.write(data);
});
process.on('SIGINT', () => {
  process.exit();
});
