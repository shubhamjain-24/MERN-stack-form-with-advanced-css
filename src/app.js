const express = require('express');
require("./db/conn");
const path = require('path');
const hbs = require('hbs');
const User = require("./models/user")

const app = express();
const port = process.env.port ||3000;

// setting the path 
const staticpath = path.join(__dirname,"../public");
const templatespath = path.join(__dirname,"../templates/views");
const partialpath = path.join(__dirname,"../templates/partials");


// (middleware)
app.use('/css',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/js')));
app.use('/jq',express.static(path.join(__dirname,'../node_modules/jquery/dist')));
app.use(express.static(staticpath))

app.use(express.urlencoded({extended:false}))
// setting view engine
app.set("view engine","hbs");
app.set("views",templatespath);
hbs.registerPartials(partialpath);

// routing
app.get("/",(req,res)=>{
    res.render('index')
})
app.get("/contact",(req,res)=>{
    res.render('contact')
})

app.post("/contact",async (req,res)=>{
    try {
        const userData = new User(req.body);
     await userData.save()
     res.status(201).render("index")
    } catch (error) {
        res.status(500).send(error)
    }
})


// server creation

app.listen(port,()=>{
    console.log(`server is running at port number ${port}`);
})