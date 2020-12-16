const fs = require('fs');
const app = require('express')();
const cors = require('cors');
const bodyParser = require("body-parser");
app.use(bodyParser());
const questions = "questions.json";
const userData = "userdata.json";
let jsonString = [];


app.use(cors({
    origin: "http://localhost:4200"
}));

const middlewareFn=(req,res,next)=>{
    // console.log('MiddleWare fun Called');
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept");
     // res.status(500).send("Invalid request");
    next();
}
app.use(middlewareFn);

// function to read data
const readData = (filename) => {
    fs.readFile("../jsonDatabase/"+filename, "utf-8", (err, data) => {
        if(err) {
            return err;
        } 
        jsonString = JSON.parse(data);
        return jsonString;
    })
}

// function to write data
const writeData = (dataArray, fileName) => {
    let code;
    fs.writeFile("../jsonDatabase/"+fileName, JSON.stringify(dataArray), (err) => { 
        code =  err ? false : true;

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
    const dataHead = req.body;
    let dataArray = [];
    fs.readFile("../jsonDatabase/userdata.json", "utf-8", (err,data) => {
           
        dataArray = JSON.parse(data);
        console.log(dataHead,dataArray)
        const findVar = dataArray.findIndex( 
            obj => obj.email === dataHead.email
        );
        if ( findVar === -1) {
            dataArray.push(dataHead);
            console.log(dataArray);
            writeData(dataArray,userData);
        }
     })
  
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