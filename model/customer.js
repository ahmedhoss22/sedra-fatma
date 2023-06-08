const mongoose=require('mongoose')
const Schema=mongoose.Schema

  const customersSchema = new Schema({
    name: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
    nationalId: { type: Number, required: true },
    phone: { type: Number, required: true },
    phone2: { type: Number},
  });

const Customers=mongoose.model('customers',customersSchema)
module.exports=Customers