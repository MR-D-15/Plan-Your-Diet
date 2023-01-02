
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine" , "ejs");

app.get("/" , function(req,res){
    res.render("index");
});

app.get("/about" , function(req,res){
    res.render("about");
});

app.get("/help" , function(req,res){
    res.render("help");
});

app.get("/signIn" , function(req,res){
    res.render("signIn");
});

app.get("/signUp" , function(req,res){
    res.render("signUp");
});

app.get("/bmiChecker" , function(req,res){
    res.render("bmiChecker");
});

app.get("/dietPlan" , function(req,res){
    res.render("dietPlan");
});

app.get("/userHomepage" , function(req,res){
    res.render("userHomepage");
});

app.listen(3000, function(){
    console.log("Server is running at port 3000...");
});