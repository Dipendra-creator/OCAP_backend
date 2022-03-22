const express = require('express')
const { generateFile, generateMainFile } = require('./generateFile')
const { executeCpp, executePy, executeJs, executeJava } = require('./executor')
// const cors  = require('./cors')
const app = express();

// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({hello: "World!"});
});

app.post('/run', async (req, res) => {
    const { language = "cpp", code } = req.body;
    if (code === undefined) {
        return res.status(400).json({success: false, error: "No code provided"});
    }
    try {
        // need to generate a code extension file with the code from the request
        let filepath = "";
        if (language != 'java') {
            filepath = await generateFile(language, code);
        } else {
            filepath = await generateMainFile(language, code);
        }
        // then run the code with the extension file
        // and return the result
        if (language === "cpp") {
            const result = await executeCpp(filepath);
            return res.json({success: true, result});
        }
        if (language === "py") {
            const result = await executePy(filepath);
            return res.json({success: true, result});
        }
        if (language === "js") {
            const result = await executeJs(filepath);
            return res.json({success: true, result});
        }
        if (language === "java") {
            const result = await executeJava(filepath);
            return res.json({success: true, result});
        }
    } catch (error) {
        return res.status(500).json({error});
    }
});

app.listen(5000, () => {
    console.log('Server started on port 5000!');
    
    console.log('http://localhost:5000/');
});

