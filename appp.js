const express = require("express");

const app = express();

const PORT = 3000;

app.get("/",(req, res) =>{
    res.send("Hello, There...");
})

app.listen(PORT, (req, res) =>{
    console.log("Listening...");
})