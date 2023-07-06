const mongoose=require('mongoose')
const Schema=mongoose.Schema

const reservationSchema=new Schema({
    client:{
        name:{type:String,trim:true,required:true},
        id:{type:Schema.Types.ObjectId,ref:"users",trim:true, required:true},
        phone:{type:Number,required:true}
    },
    entity:{
        name:{type:String,trim:true,required:true},
        id:{type:String,trim:true,required:true},
    },
    cost:{type:Number,required:true},
    restored:{type:Boolean ,default :false},
    damage:{type:Number,default:0},
    payment:[{
        _id: {type: Number,required:true},
        paid:{type:Number,default:0},
        insurance:{type:Number,default:0},
        type:{type:String,required:true,trim:true},
    }],
    period:{
        type:{type:String,trim:true,required:true}, // days or dayPeriod
        startDate:{type:String,trim:true,required:true}, 
        endDate:{type:String,trim:true},
        dayPeriod:{type:String,trim:true}           //morning - night -whole day
    },
    status:{type:String,trim:true,required:true},   // unconfirmed - canceled ... 
    contractNumber:{type:Number,default:0},
    rated:{type:Boolean,default:false},
    date:{type:String,trim:true,required:true},
    deferred:{type:Boolean,default:false},
    image:{type:String,trim:true},
    type:{type:String,trim:true,required:true},     // chalet - resort - hall
    cancelRequest:{type:Boolean,default:false},
    completed:{type:Boolean,default:false},
    employee:{type:String},
})
const Reservation=mongoose.model('reservations',reservationSchema)
module.exports=Reservation