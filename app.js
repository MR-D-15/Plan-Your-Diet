
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/index.html" , function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/about.html" , function(req,res){
    res.sendFile(__dirname + "/about.html");
});

app.get("/help.html" , function(req,res){
    res.sendFile(__dirname + "/help.html");
});

app.get("/sign_in.html" , function(req,res){
    res.sendFile(__dirname + "/sign_in.html");
});

app.get("/sign_up.html" , function(req,res){
    res.sendFile(__dirname + "/sign_up.html");
});

app.get("/bmiChecker.html" , function(req,res){
    res.sendFile(__dirname + "/bmiChecker.html");
});

app.get("/dietPlan.html" , function(req,res){
    res.sendFile(__dirname + "/dietPlan.html");
});

app.get("/userHomepage.html" , function(req,res){
    res.sendFile(__dirname + "/userHomepage.html");
});

app.listen(3000, function(){
    console.log("Server is running at port 3000...");
});