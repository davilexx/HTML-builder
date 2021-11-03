const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const filePath = path.join(__dirname, 'text.txt');


fs.writeFile(filePath, '', err => {
    if (err) {
        throw err
    }

    const inputAgain = () => {
        rl.question('Enter the text: ', (value) => {
            let text = value;
        
            if (value === 'exit') {
                process.exit();
            } else {
                inputAgain();
            }
    
            fs.appendFile(filePath, `${text}\n`, () => {});
        })
    };

    inputAgain();
})

process.on('exit', () => {
    console.log(`Process ended successfully!`)
})