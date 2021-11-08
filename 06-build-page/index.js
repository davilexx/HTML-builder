const fs = require('fs');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist');

const templateFilePath = path.join(__dirname, 'template.html');
const indexFileDestinationPath = path.join(__dirname, 'project-dist/index.html');

const componentsPath = path.join(__dirname, 'components');

const stylesPath = path.join(__dirname, 'styles');
const stylesDestination = path.join(__dirname, 'project-dist/style.css');

const assetsPath = path.join(__dirname, 'assets');
const assetsDestination = path.join(__dirname, 'project-dist/assets');

console.log('Building the page. It will take some time, be patient!');

fs.readdir(__dirname, (err) => {
    if (err) {
        throw err
    }

    // create project-dist folder

    const createProjectDist = () => {
        fs.mkdir(projectDist, (err) => {
            if (err) {
                throw err
            }
        })
    }

    const removeOldProjectDist = () => {
        fs.rmdir(projectDist, { recursive: true }, (err) => {
            if (err) {
                throw err
            }
        })
    }
    

    fs.access(projectDist, (err) => {
        if (err) {
            setTimeout(createProjectDist, 1000);
            buildPage();
        } else {
            setTimeout(removeOldProjectDist, 1000);
            setTimeout(createProjectDist, 2000);
            buildPage();
        }
    })

    const assetsFonts = path.join(assetsPath, 'fonts');
    const assetsFontsDestination = path.join(assetsDestination, 'fonts');

    const assetsImg = path.join(assetsPath, 'img');
    const assetsImgDestination = path.join(assetsDestination, 'img');

    const assetsSvg = path.join(assetsPath, 'svg');
    const assetsSvgDestination = path.join(assetsDestination, 'svg');

    const createFolders = () => {
        fs.mkdir(assetsDestination, { recursive: true }, () => {});
        fs.mkdir(assetsFontsDestination, { recursive: true }, () => {});
        fs.mkdir(assetsImgDestination, { recursive: true }, () => {});
        fs.mkdir(assetsSvgDestination, { recursive: true }, () => {});
    }
    setTimeout(createFolders, 3000);

    const buildPage = () => {
        fs.readFile(templateFilePath, (err, data) => {
            if (err) {
                throw err
            }
    
            var result = data.toString();
    
            // replace sections

            const replaceSections = () => {

                fs.readdir(componentsPath, {withFileTypes: true}, (err, files) => {
                    if (err) {
                        throw err
                    }

                    const replace = () => {
                        files.forEach(file => {                
                            if(file.isFile() === true && path.extname(file.name) === '.html') {
                                fs.readFile(path.join(componentsPath, file.name), (err, data) => {
                                    if (err) {
                                        throw err
                                    }
    
                                    let fileName = file.name.replace(/\.[^/.]+$/, '');
                                    let section = data.toString();
                                    result = result.replace(`{{${fileName}}}`, section);
    
                                    fs.writeFile(indexFileDestinationPath, result, (err) => {
                                        if (err) {
                                            throw err
                                        }
                                    })
                                })
                            }
                        });
                    }

                    setTimeout(replace, 4000);
                })
            }
            setTimeout(replaceSections, 5000);
        })
    
        // add styles
    
        const addStyles = () => {
            fs.readdir(stylesPath, {withFileTypes: true}, (err, files) => {
                if (err) {
                    throw err
                }
            
                fs.access(stylesDestination, (err) => {
                    if (err) {
                        fs.appendFile(stylesDestination, '', () => {});
                    } else {
                        fs.unlink(stylesDestination, (err) => {
                            if (err) {
                                throw err
                            }
                        });
                    }
                })
                
                files.forEach(file => {
                    if(file.isFile() === true && path.extname(file.name) === '.css') {
                        const filePath = fs.createReadStream(`${stylesPath}/${file.name}`);
            
                        filePath.on('data', (data) => {
                            fs.appendFile(stylesDestination, `${data.toString()}\n`, () => {});
                        })
                    }
                });
            });
        };
        setTimeout(addStyles, 6000);
    
        // add assets
    
        const copyFonts = () => {
            fs.readdir(assetsFonts, {withFileTypes: true}, (err, files) => {
                if (err) {
                    throw err
                }
            
                fs.mkdir(assetsFontsDestination, { recursive: true }, (err) => {
                    if (err) {
                        throw err
                    }
                })
                
                files.forEach(file => {
                    let filePath = `${assetsFonts}/${file.name}`;
                    let filePathCopy = `${assetsFontsDestination}/${file.name}`;
            
                    if(file.isFile() === true) {
                        fs.copyFile(filePath, filePathCopy, (err) => {
                            if (err) {
                                throw err
                            }
                        })
                    }
                });
            });
        };
        setTimeout(copyFonts, 7000);
    
        const copyImg = () => {
            fs.readdir(assetsImg, {withFileTypes: true}, (err, files) => {
                if (err) {
                    throw err
                }
            
                fs.mkdir(assetsImgDestination, { recursive: true }, (err) => {
                    if (err) {
                        throw err
                    }
                })
                
                files.forEach(file => {
                    let filePath = `${assetsImg}/${file.name}`;
                    let filePathCopy = `${assetsImgDestination}/${file.name}`;
            
                    if(file.isFile() === true) {
                        fs.copyFile(filePath, filePathCopy, (err) => {
                            if (err) {
                                throw err
                            }
                        })
                    }
                });
            });
        }
        setTimeout(copyImg, 8000);
    
        const copySvg = () => {
            fs.readdir(assetsSvg, {withFileTypes: true}, (err, files) => {
                if (err) {
                    throw err
                }
            
                fs.mkdir(assetsSvgDestination, { recursive: true }, (err) => {
                    if (err) {
                        throw err
                    }
                })
                
                files.forEach(file => {
                    let filePath = `${assetsSvg}/${file.name}`;
                    let filePathCopy = `${assetsSvgDestination}/${file.name}`;
            
                    if(file.isFile() === true) {
                        fs.copyFile(filePath, filePathCopy, (err) => {
                            if (err) {
                                throw err
                            }
                        })
                    }
                });
            });
        }
        setTimeout(copySvg, 9000);
    }
    setTimeout(() => console.log('Page has been built successfully!'), 9100);
    
})