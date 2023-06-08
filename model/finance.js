const mongoose=require('mongoose')
const Schema=mongoose.Schema

const expensesSchema=new Schema({
    type:{type:String,trim:true,required:true},
    amount:{type:Number,trim:true,required:true},
    billType:{type:String,trim:true,required:true},
    reciver:{type:String,trim:true,required:true},
    date:{type:String,trim:true,required:true},
    bill:{type:String,trim:true},
})
const Expenses=mongoose.model('expenses',expensesSchema)

const paypalSchema=new Schema({
    bank:{type:String,trim:true,required:true},
    amount:{type:Number,trim:true,required:true},
    reciver:{type:String,trim:true,required:true},
    donater:{type:String,trim:true,required:true},
    employee:{type:String,trim:true,required:true},
    date:{type:String,trim:true,required:true},
})
const Paypal=mongoose.model('paypal',paypalSchema)

const drawsSchema=new Schema({
    type:{type:String,trim:true,required:true},
    amount:{type:Number,trim:true,required:true},
    employee:{type:String,trim:true,required:true},
    date:{type:String,trim:true,required:true},
    note:{type:String,trim:true,default:"لا يوجد"},
})
const Draws=mongoose.model('draws',drawsSchema)

const onlinePaymentSchema=new Schema({
    bank:{type:String,trim:true,required:true},
    amount:{type:Number,trim:true,required:true},
    reciver:{type:String,trim:true,required:true},
    donater:{type:String,trim:true,required:true},
    employee:{type:String,trim:true,required:true},
    date:{type:String,trim:true,required:true},
})
const OnlinePayment=mongoose.model('onlinePayment',onlinePaymentSchema)

const BankTransactionSchema=new Schema({
    bank:{type:String,trim:true,required:true},
    amount:{type:Number,trim:true,required:true},
    reciver:{type:String,trim:true,required:true},
    donater:{type:String,trim:true,required:true},
    employee:{type:String,trim:true,required:true},
    date:{type:String,trim:true,required:true},
})
const BankTransaction=mongoose.model('bankTransaction',BankTransactionSchema)


module.exports={Expenses,Paypal,Draws,OnlinePayment,BankTransaction}