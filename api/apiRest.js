const fs = require('fs');
const app = require('express')();
const cors = require('cors');
const questions = "questions.json";
const userData = "userData.json";
let jsonString;


app.use(cors({
    origin: "http://localhost:4200"
}));

// const middlewareFn=(req,res,next)=>{
//     console.log('MiddleWare fun Called');
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept");
//      // res.status(500).send("Invalid request");
//     next();
// }
// app.use(middlewareFn);

// function to read data
const readData = (filename) => {
    fs.readFile(`../jsonDatabase/${filename}`, "utf-8", (err, data) => {
        if(err) {
            return err;
        } else {
            jsonString = JSON.parse(data);
            console.log(jsonString);
        }
    })
}

// function to write data
const writeData = (dataArray, fileName) => {
    fs.writeFile(fileName, dataArray, (err) => { 
        const code =  err ? false : true; 
    });
    return code;
}


app.get("/api/test/", (req,res) => {
    readData(questions);
    res.send(jsonString);
})
app.get("/api/userdata", (req,res) => {
    readData(userData);
    res.send(jsonString);
})

app.post("/api/createuser", (req,res) => {
    const data = req.body;
    readData(userData);
    const mailSearch = jsonString.find(obj => obj.email === data.email);
    if (mailSearch !== undefined) {
        jsonString.push(data);
        writeData(jsonString, userData) ? res.send("User Created Successfully") : res.send("Error while creating user !");
    } else {
        res.send(false);
    }
}) // send false if user exist

app.put("/api/score", (req,res) => {
    const data = req.body;
    readData(userData);
    const index = jsonString.findIndex(obj => obj.email === data.email);
    jsonString[index] = data;
    writeData(updatedData, userData)
})

app.get("/api/check/:email", (req,res) => {
    readData(userData);
    const email = req.params.email;
    const findEmail = jsonString.find( obj => obj.email === email);
    (find === undefined) ? res.send(true) : res.send(false);
}) // send false if mail not found

app.listen(3000, () => console.log('server running on port 3000'));