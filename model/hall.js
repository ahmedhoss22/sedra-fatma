const mongoose=require('mongoose')
const Schema=mongoose.Schema

const hallSchema=new Schema({
    name:{type:String,trim:true,required:true},
    images:{type:Array,required:true},
    rooms:{type:Number,trim:true,required:true},
    halls:{type:String,trim:true,required:true},
    price:{type:Number,trim:true,required:true},
    capacity:{type:String,trim:true,require:true},
    rate:{type:Array,default:[]},
    details:{type:String,trim:true}
})
const Hall=mongoose.model('hall',hallSchema)
module.exports=Hall