const hallValidation = require("../validation/hallValidation")
const Hall=require("../model/hall")

const hall={
    postHall:async(req,res)=>{
        try {
            let images=req.imgNames
            let {name,rooms,halls,capacity,nightPrice,morningPrice,wholeDayPrice,details}=req.body
            let {errors,isValid}=hallValidation(name,rooms,halls,capacity)

            if(!isValid) return res.status(403).send({errors})
            
            const hall=new Hall({name,images,rooms,halls,capacity,"price.night":nightPrice,"price.morning":morningPrice,"price.wholeDay":wholeDayPrice,details})
            await hall.save()
            .then(()=> res.sendStatus(201))
            .catch((error)=>{
                console.log(error.message);
               return res.status(500).send({error:error.message})
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    },
    getHall:async(req,res)=>{
        try {
            let halls= await Hall.find()
            res.send(halls)
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    },
    deleteHall:async(req,res)=>{
        try {
            let {id}=req.params
            await Hall.findByIdAndDelete({_id:id})
            .then(()=> res.sendStatus(202))
            .catch((err)=>res.status(500).send(err))
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    }
}
module.exports =hall