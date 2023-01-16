const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine" , "ejs");

app.use(session({
    secret: "Plan Your Diet",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.set("strictQuery" , false);
mongoose.connect("mongodb://127.0.0.1:27017/pydUserDB");

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const userInfoSchema = new mongoose.Schema({
    name: String,
    gender: String,
    email: String,
    birthDate: String,
    sickness: String
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User" , userSchema);
const UserInfo = mongoose.model("UserInfo" , userInfoSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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
    if(req.isAuthenticated()) {
        res.render("bmiChecker");
    } else {
        res.redirect("/signIn");
    }
});

app.get("/dietPlan" , function(req,res){
    if(req.isAuthenticated()) {
        res.render("dietPlan");
    } else {
        res.redirect("/signIn");
    }
});

app.get("/userHomepage" , function(req,res){

    if(req.isAuthenticated()) {
        res.render("userHomepage");
    } else {
        res.redirect("/signIn");
    }
});

app.get("/signOut" , function(req , res){
    req.logout(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    })
})

app.post("/register" , function(req , res){

    User.register({username: req.body.username}, req.body.password , function(err , user){
        if(err) {
            console.log(err);
            res.redirect("/signUp");
        } else {
            passport.authenticate("local")(req , res , function(){
                const userinfo = new UserInfo({
                    name: req.body.name,
                    gender: req.body.gender,
                    email: req.body.username,
                    birthDate: req.body.birthDate,
                    sickness: req.body.sickness
                });

                userinfo.save();

                res.redirect("/userHomepage");
            });
        }
    })
})

app.post("/signedIn" , function(req , res){
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user , function(err){
        if(err){
            console.log(err);
        } else {
            passport.authenticate("local")(req , res , function() {
                res.redirect("/userHomepage");
            });
        }
    })
});


app.listen(3000, function(){
    console.log("Server is running at port 3000...");
});