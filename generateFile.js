const path = require('path');
const fs = require('fs');
const { v4: uuid } = require('uuid');

const dirCodes = path.join(__dirname, 'codes');

// if dir not exists
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes);
}

// generate file
const generateFile = async (format, code) => {
    const jobId = uuid();
    const filename = `${jobId}.${format}`;
    const filepath = path.join(dirCodes, filename);
    await fs.writeFileSync(filepath, code);
    return filepath;
};

// generate Main.java file for java in jobId foelder
const generateMainFile = async (format, code) => {
    const jobId = uuid();
    const folderpath = path.join(dirCodes, jobId);
    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath, { recursive: true });
    }
    const filepath = path.join(folderpath, `Main.${format}`);
    if (!fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, code);
    }
    return filepath;
};


module.exports = {
    generateFile, generateMainFile
};