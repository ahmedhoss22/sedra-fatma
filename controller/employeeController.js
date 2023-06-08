const Employee=require("../model/employee")
const bcrypt=require('bcrypt')
const middleware=require("../middlewares/middleware")
const employeeValidation = require("../validation/employeeValidation")
const employee={
    signin:async (req,res)=>{
        try {
            let {email,password}=req.body
            if(!email) return res.status(404).send({email:"Email is required"})
            if(!password) return res.status(404).send({password:"Password is required"})
            let user= await Employee.findOne({email})
            if(!user)  return res.status(404).send({email:"Email not found"})
            if(! await bcrypt.compare(password,user.password)) return res.status(403).send({password:"Invalid password"})
            delete user.password
            let token=await middleware.generateToken({user})
            res.send({token})
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message)
        }
    },
    addEmployee:async(req,res)=>{
          try {
            console.log("AASDasdasd");
            let {name,nationalId,phone,email,password}=req.body
            let {errors,isValid}= employeeValidation(name,email,password,nationalId,phone)
            if(!isValid) return res.status(403).send(errors)
            let user =new Employee({name,email,password,nationalId,phone})
            await user.save()
            .then(()=>res.sendStatus(201))
            .catch((err)=>{
               if(err.code==11000) return res.status(403).send({email:"Email is already taken"})
               return res.status(403).send(err.message)
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    },
    getEmployees:async(req,res)=>{
        try {
            let employees=await Employee.find({admin:false})
            res.send(employees)
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    },
    deleteEmployee:async(req,res)=>{
        try {
            let {id}=req.params
            await Employee.findByIdAndDelete({_id:id})
            .then(()=>res.send())
            .catch((error)=>{
                console.log(error.message);
                res.status(500).send({error:error.message})
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    },
    updateEmployee:async(req,res)=>{
        try {
            let {name,email,password,nationalId,phone,_id}=req.body
            let hashed=await bcrypt.hash(password,10)
            await Employee.findByIdAndUpdate({_id},{name,email,password:hashed,nationalId,phone})
            .then(()=>res.send())
            .catch((error)=>{
                console.log(error.message);
                res.status(500).send({error:error.message})
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    },
    updatePermissions:async(req,res)=>{
        try {
            let {_id}=req.body
            delete req.body._id
            await Employee.findByIdAndUpdate({_id},{permissions:req.body})
            .then(()=>res.send())
            .catch((err)=>res.status(403).send({error:err.message}))
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    },
    getAdminData:async (req,res)=>{
        try {
            let {_id}=req.user
            let data=await Employee.findOne({_id})
            res.send(data)
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    }
}
module.exports=employee;