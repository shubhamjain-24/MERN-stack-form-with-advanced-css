const mongoose = require('mongoose');


// creating a database
mongoose.connect("mongodb://localhost:27017/shubhamdyanamic")
.then(()=>{
    console.log("connection successfull");
}).catch((err)=>{
    console.log(err);
})