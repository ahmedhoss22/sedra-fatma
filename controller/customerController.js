const User = require("../model/user")
const Customer=require("../model/user")
const customerValidation = require("../validation/customerValidation")
const customer={
    postCustomer:async(req,res)=>{
        try {
            let {name,phone,phone2,address,nationalId,email,password,}=req.body
            let {errors,isValid}=customerValidation(name,address,nationalId,phone)
            if(!isValid) return res.status(403).send({errors})
            let customer=new Customer(req.body)
           return await customer.save()
            .then(()=>res.sendStatus(201))
            .catch((error)=>{
                
                if (error.code==11000) return res.status(403).send({email:"Email is already taken"})
               return res.status(400).send({error:error.message})
            })
        } catch (error) {
            console.log(error.code);
            res.status(500).send({error:error.message})
        }
    },
    getCustomer: async (req, res) => {
        try {
          let customer = await User.find()
          res.send(customer);
        } catch (error) {
          console.log(error.message);
          res.status(500).send({ error: error.message });
        }
      },
    updateCustomer:async(req,res)=>{
        try {
            let {_id,name,phone,phone2,address,nationalId}=req.body
            await Customer.findByIdAndUpdate({_id},{name,phone,phone2,address,nationalId})
            .then(()=>res.send())
            .catch((err)=>{
                console.log(err.message);
                res.status(403).send(err.message)                
            }) 
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    },
    deleteCustomer:async(req,res)=>{
        try {
            let id =req.params.id
            await Customer.findByIdAndDelete({_id:id})
            .then(()=>res.send())
            .catch((error)=>{
                console.log(error.message);
               return res.status(400).send({error:error.message})
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    },
}
module.exports=customer