const bcrypt=require('bcrypt')
const User = require("../model/user")
const validateSignupData = require("../validation/signupValidation")
const middleware=require("../middlewares/middleware")
const otp = require('../services/otp')
const redis = require('redis');
const mogoose=require('mongoose')
const Reservation = require('../model/reservation')
const db=mogoose.connection
const collection = db.collection('otpCollection');

const users={
    signup:async (req,res)=>{
        try {
            let {name,password,phone,email}=req.body
            let {errors,isValid}= validateSignupData(name,email,password,phone)
            let uniqueEmail=await User.findOne({email})
            if(uniqueEmail) return res.status(403).send({email:"Email address already taken"})
            if(!isValid) return res.status(403).send(errors)
            const user=new User({name,email,password,phone})
            await user.save()
            .catch((err)=>{
                console.log(err.message);
              //  if(Object.keys(err.keyValue)[0]=='phone')return res.status(403).send({phone:"Phone number is already taken"})
                 if(Object.keys(err.keyValue)[0]=='email')return res.status(403).send({email:"Email address is already taken"})
            })
            res.sendStatus(201)
        } catch (error) {
            console.log(error.message);
            res.status(400).send(error.message)
        }
    },
    signin:async(req,res)=>{
        try {
            let {email,password}=req.body
            let user=await User.findOne({ email })
            if(!user) return res.status(404).send({phone:"Email address not found"})
            if(!await bcrypt.compare(password,user.password)) return res.status(403).send({password:"Invalid Password"})
            const token = await middleware.generateToken({user})
            res.send({token})
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    },
    sendOtb:async(req,res)=>{
        try {
            const otpCode = await otp.generateOtp();
            const timestamp = new Date();
            console.log(otpCode);
          
            const result = await collection.updateOne(
              { userId: req.user._id },
              { $set: { otpCode, timestamp } },
              { upsert: true }
            );
            console.log(result.modifiedCount);
            console.log(await collection.findOne({userId:req.user._id}));
          
            // Send OTP code to user
            otp.sendOtp(req.user.phone, otpCode);
            res.send({ otpCode });
          } catch (error) {
            console.log(error.message);
            res.sendStatus(500);
          }          
    },
    phoneVirefy:async(req,res)=>{
        try {
            let user=await collection.findOne({userId:req.user._id})
            let {otb}=req.body
            console.log(otb,user.otpCode);
            if(otb==user.otpCode){
                User.findByIdAndUpdate(req.user._id,{ phoneVireficatoin: true },{ new: true })
                .then(updatedUser => console.log(updatedUser))
                .catch(error => console.log(error.message));
                res.sendStatus(202)
            }else res.status(403).send({otp:"Invalid otp"})
        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    },
    getUser:async(req,res)=>{
        try {
            let data= await User.findOne({_id:req.user._id})
            res.send(data)
        } catch (error) {
            console.log(error.message);
            res.sendStatus(500)
        }
    },
    getUserReservations:async (req,res)=>{
        try {
            let {_id}=req.user
            let reservations =await Reservation.find({'client.id':_id})
            res.send(reservations)
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message)
        }
    },
    cancelUserReservation:async (req,res)=>{
        try {
            let {id}=req.params
            await Reservation.findByIdAndUpdate(id,{cancelRequest:true})
            .then(()=>res.send())
            .catch((error)=>{
                console.log(error.message);
                res.status(500).send(error.message)
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message)
        }
    },
    updateUserData:async(req,res)=>{
        try {
            let {_id,name,email,phone}=req.body
            await User.findByIdAndUpdate(_id,{name,email,phone,image:req.img})
            .then((result)=>res.send(result))
            .catch((error)=>{
                if(error.code==11000) return res.status(500).send({email:"Email is already taken"})
                console.log();
                
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message)
        }
    },
    updateUserPassword:async (req,res)=>{
        try {
            let {newPass,oldPass}=req.body
            let user=await User.findById(req.user._id)
            console.log(newPass);
            console.log(await bcrypt.compare(oldPass,user.password));
            if( !await bcrypt.compare(oldPass,user.password)) return res.status(403).send({password:"كلمة السر خاطئة"})
            let hashed = await bcrypt.hash(newPass,10)
            User.findByIdAndUpdate(req.user._id,{password:hashed})
            .then(()=>res.send())
            .catch((err)=>{
                console.log(err.message);
                res.status(400).send(err.message)
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message)
        }
    }
}
module.exports=users