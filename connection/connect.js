const url=process.env.DB_URL
const mongoose=require('mongoose')
console.log(url);
function databaseConnection(){
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
     }).then(()=>{
         console.log("Database connected !!!!");
     }).catch((err)=>{
         console.log(err);
         console.log("NOT CONNECTED");
     })
}
module.exports =databaseConnection