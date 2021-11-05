const fs = require('fs');
const path = require('path');
const folder = '05-merge-styles/styles';
const destination = '05-merge-styles/project-dist/bundle.css';

fs.readdir(folder, {withFileTypes: true}, (err, files) => {
    if (err) {
        throw err
    }

    fs.access(destination, (err) => {
        if (err) {
            fs.appendFile(destination, '', () => {});
        } else {
            fs.unlink(destination, (err) => {
                if (err) {
                    throw err
                }
            });
        }
    })
    
    files.forEach(file => {
        if(file.isFile() === true && path.extname(file.name) === '.css') {
            const filePath = fs.createReadStream(`${folder}/${file.name}`);

            filePath.on('data', (data) => {
                fs.appendFile(destination, `${data.toString()}\n`, () => {});
            })
        }
    });
});