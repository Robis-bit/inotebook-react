const mongoose= require('mongoose');
const mongoUri="mongodb://localhost:27017/inote?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
const connectToMongoo =()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("mogo is successfully connect");
    })
}

module.exports=connectToMongoo;