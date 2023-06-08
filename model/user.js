const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bcrypt=require('bcrypt')

  const UserSchema = new Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true, minlength: 7 },
    phoneVerification: { type: Boolean, default: false },
    image:{type:String,trim:true}
  });
  
UserSchema.index({ email: 1 }, { unique: true });

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }
    try {
      const salt = await bcrypt.genSalt(8);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      next();
    } catch (error) {
      return next(error);
    }
  });
const User=mongoose.model('user',UserSchema)
module.exports=User