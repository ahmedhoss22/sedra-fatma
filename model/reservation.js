const mongoose=require('mongoose')
const Schema=mongoose.Schema

const reservationSchema=new Schema({
    client:{
        name:{type:String,trim:true,required:true},
        id:{type:String,trim:true},
    },
    entity:{
        name:{type:String,trim:true,required:true},
        id:{type:String,trim:true,required:true},
    },
    finance:{
        cost:{type:Number,required:true},
        paid:{type:Number,default:0},
        remain:{type:Number,default:0},
        tax:{type:Number,default:0},
        insurance:{
            amount:{type:Number,default:0},
            damage:{type:Number,default:0},
            remain:{type:Number,default:0},
            restored:{type:Boolean ,default :false}
        }
    },
    period:{
        type:{type:String,trim:true}, // days or one day
        startDate:{type:String,trim:true}, 
        endDate:{type:String,trim:true},
        dayPeriod:{type:String,trim:true}           //morning - night -whole day
    },
    status:{type:String,trim:true,required:true},   // unconfirmed - canceled ... 
    contractNumber:{type:Number,default:0},
    rated:{type:Boolean,default:false},
    date:{type:String,trim:true,required:true},
    deferred:{type:Boolean,default:false},
    image:{type:String,trim:true},
    cancelRequest:{type:Boolean,default:false},
    completed:{type:Boolean,default:false},
    employee:{type:String,required:true}
})
const Reservation=mongoose.model('reservations',reservationSchema)
module.exports=Reservation