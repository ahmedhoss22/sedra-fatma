const mongoose=require('mongoose')
const Schema=mongoose.Schema

const chaletSchema=new Schema({
    name:{type:String,trim:true,required:true},
    images:{type:Array,required:true},
    area:{type:Number,trim:true,required:true},
    address:{type:String,trim:true,required:true},
    sleeping:{type:Number,trim:true,required:true},
    lounge:{type:Number,trim:true,required:true},
    kitchen:{type:Number,trim:true,required:true},
    bath:{type:Number,trim:true,required:true},
    rate:{type:Array,default:[]},
    price:{
       morning: {type:Number,trim:true,required:true},
       night: {type:Number,trim:true,required:true},
       wholeDay: {type:Number,trim:true,required:true},
    },
    details:{type:String,trim:true}
})
const Chalet=mongoose.model('chalet',chaletSchema)
module.exports=Chalet