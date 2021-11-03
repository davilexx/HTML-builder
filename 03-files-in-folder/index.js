const fs = require('fs');
const path = require('path');
const folder = '03-files-in-folder/secret-folder/';

fs.readdir(folder, {withFileTypes: true}, (err, files) => {
    if (err) {
        throw err
    }
    
    files.forEach(file => {
        if(file.isFile() === true) {
            let fileName = file.name.replace(/\.[^/.]+$/, "");
            let extension = path.extname(file.name);

            fs.stat(`${__dirname}/secret-folder/${file.name}`, (err, stats) => {
                if (err) {
                    throw err
                }

                console.log(`${fileName} - ${extension.slice(1)} - ${stats.size}B`);
            })
        }
    });
});