const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bcrypt=require('bcrypt')

  const adminSchema = new Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nationalId: { type: Number, required: true ,unique:true},
    phone: { type: Number, required: true },
    permissions: { type: Object,default:{
      expenses: false,
      insurance: false,
      bankTransfer: false,
      withdraw: false,
      onlinePayment:false,
      client:false,
      addEntity:false,
      removeEntity:false,
      addReservation:false,
      editReservation:false,
      removeReservation:false,
      acceptReservation:false,
      deferreReservation:false,
      paypal:false,
      addClient:false,
      cancelReaquest:false
    }},
    admin: { type: Boolean ,default:false },
  });
  adminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      next();
    } catch (error) {
      return next(error);
    }
  });
const Employee=mongoose.model('employee',adminSchema)
module.exports=Employee