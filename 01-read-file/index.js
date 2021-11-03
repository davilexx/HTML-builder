const fs = require('fs');
const filePath = fs.createReadStream('01-read-file/text.txt');

filePath.on('data', (data) => {
    console.log(data.toString().trim())
})