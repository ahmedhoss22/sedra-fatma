const Chalet = require("../model/chalet")
const chaletValidation = require("../validation/chaletValidation")

const chalet={
    postChalet:async(req,res)=>{
        try {
            let images=req.imgNames
            let {name,area,address,bath,lounge,nightPrice,morningPrice,wholeDayPrice,sleeping,kitchen,details}=req.body
            let {errors,isValid}=chaletValidation(name,area,address,bath,lounge,sleeping,images,kitchen)
            if(!isValid) return res.status(403).send({errors})
            const chalet=new Chalet({name,images,details,area,address,sleeping,lounge,kitchen,bath,"price.morning":morningPrice,"price.night":nightPrice,"price.wholeDay":wholeDayPrice})
            await chalet.save()
            .catch((error)=>{
                console.log(error.message);
               return res.status(500).send({error:error.message})
            })
            res.sendStatus(201)
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    },
    getChalet:async(req,res)=>{
        try {
            let chalets=await Chalet.find()
            res.send(chalets)
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    },
    deleteChalet:async(req,res)=>{
        try {
            let {id}=req.params
            await Chalet.findByIdAndDelete({_id:id})
            .then(()=> res.sendStatus(202))
            .catch((err)=>res.status(500).send(err))
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    }
}

module.exports =chalet