const mongoose =require('mongoose');

function dbConnection(){
    try{
mongoose.connect('mongodb://localhost/27017/blogger').then(()=>{
    console.log("Mongodb Connected"); 
})}
catch(err){
    console.log('error aagya cannot connect to db');
}
}
module.exports=dbConnection;
