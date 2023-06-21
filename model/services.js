const mongoose=require('mongoose')
const Schema=mongoose.Schema

const packageSchema=new Schema({
    package:{type:String,trim:true,required:true},
    price:{type:Number,trim:true,required:true},
})
const serviceSchema=new Schema({
    service:{type:String,trim:true,required:true},
})
const Package=mongoose.model('packages',packageSchema)
const Services=mongoose.model('services',serviceSchema)
module.exports={Package,Services}