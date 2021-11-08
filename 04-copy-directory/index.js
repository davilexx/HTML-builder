const fs = require('fs');
const path = require('path');
const folder = '04-copy-directory/files/';
const folderCopy = '04-copy-directory/files-copy/';

fs.readdir(folder, {withFileTypes: true}, (err, files) => {
    if (err) {
        throw err
    }

    fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
        if (err) {
            fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
                if (err) {
                    throw err
                } else {
                    fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
                        if (err) {
                            throw err
                        }
                        files.forEach(file => {
                            let filePath = `${folder}${file.name}`;
                            let filePathCopy = `${folderCopy}${file.name}`;
                    
                            fs.copyFile(filePath, filePathCopy, (err) => {
                                if (err) {
                                    throw err
                                }
                            })
                        });
                    })
                }
            });
        }
    })
    
    files.forEach(file => {
        let filePath = `${folder}${file.name}`;
        let filePathCopy = `${folderCopy}${file.name}`;

        fs.copyFile(filePath, filePathCopy, (err) => {
            if (err) {
                throw err
            }
        })
    });
});