const resortValidation = require("../validation/resortValidation")
const Resort=require("../model/resort")

const resort={
    postResort:async(req,res)=>{
        try {
            let images=req.imgNames
            let {name,kitchen,pool,games,nightPrice,morningPrice,wholeDayPrice,details,area}=req.body
            let {errors,isValid}=resortValidation(name,images,pool,games,kitchen,area)
            if(!isValid) return res.status(403).send({errors})
            const resort=new Resort({name,images,pool,kitchen,games,"price.night":nightPrice,"price.morning":morningPrice,"price.wholeDay":wholeDayPrice,details,area})
            await resort.save()
            .then(()=>res.sendStatus(201))
            .catch((error)=>{
                console.log(error.message);
               return res.status(500).send({error:error.message})
            })
            
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    },
    getResort:async(req,res)=>{
        try {
            let resorts= await Resort.find()
            res.send(resorts)
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    },
    deleteResort:async(req,res)=>{
        try {
            let {id}=req.params
            await Resort.findByIdAndDelete({_id:id})
            .then(()=> res.sendStatus(202))
            .catch((err)=>res.status(500).send(err))
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    }
}

module.exports =resort