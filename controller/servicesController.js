const { Package,Services} =require("../model/services")

const services={
    postPackage:(req,res)=>{
        try {
            let item =new Package(req.body)
            item.save()
            .then(()=>res.send())
            .catch((err)=>{
                console.log(err.message);
                res.status(403).send({message:err.message})
            })

        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message)
        }
    },
    getPackages:async(req,res)=>{
        try {
            let items=await Package.find({})
            res.send(items)
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message)
        }
    },
    updatePackage:async(req,res)=>{
        try {
            let id =req.body._id
            await Package.findByIdAndUpdate(id,req.body)
            .then(()=>res.send())
            .catch(()=>{throw new Error("Error while updating package")})
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message)
        }
    },
    deletePackage:async(req,res)=>{
        try {
            let {id}=req.params
            await Package.findByIdAndDelete(id)
            .then(()=>res.send())
            .catch((err)=>{throw new Error(err.message)})
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message)
        }
    },
    postService:(req,res)=>{
        try {
            let item =new Services(req.body)
            item.save()
            .then(()=>res.send())
            .catch((err)=>{
                console.log(err.message);
                res.status(403).send({message:err.message})
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message)
        }
    },
    getServices:async(req,res)=>{
        try {
            let items=await Services.find({})
            res.send(items)
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message)
        }
    },
    updateService:async(req,res)=>{
        try {
            let id =req.body._id
            await Services.findByIdAndUpdate(id,req.body)
            .then(()=>res.send())
            .catch(()=>{throw new Error("Error while updating Services")})
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message)
        }
    },
    deleteService:async(req,res)=>{
        try {
            let {id}=req.params
            await Services.findByIdAndDelete(id)
            .then(()=>res.send())
            .catch((err)=>{throw new Error(err.message)})
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message)
        }
    },
}
module.exports=services