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

    rl.question('Enter the text: ', (value) => {
        let text = value;
    
        if (value === 'exit') {
            console.log(`Process terminated successfully!`);
            process.exit();
        }

        fs.appendFile(filePath, text, () => {});
    
        process.on('exit', () => {
            console.log(`Process terminated successfully!`)
        })
    })
})



// fs.writeFile(filePath, (err, input) => {
//     if (err) {
//         throw err
//     }

//     console.log(`Write some info: ${input}`);

//     fs.appendFile(filePath, `\n${input}`, err => {
//         if (err) {
//             throw err
//         }

//         console.log('File updated');
//     })
// })