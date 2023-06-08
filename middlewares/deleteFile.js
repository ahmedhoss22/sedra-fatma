const Chalet=require("../model/chalet")
const Hall=require("../model/hall")
const Resort=require("../model/resort")
const fs = require('fs');
const path=require('path');
const User = require("../model/user");

 const deleteFile={
    chalet:async (req,res,nxt)=>{
        try {
            let chalets=await Chalet.findById({_id:req.params.id})
            chalets.images.map((ele)=>{
                let fileName=ele.split('/')[3]
                fs.unlink(path.dirname(__dirname)+'/uploads/chalet/' + fileName, (err) => {
                    if (err)throw err
                    console.log("Delete File successfully.");
                });
            })            
            nxt()
        } catch (error) {
            console.log(error.message);
            return  res.status(500).send(error.message)
        }
    },
    hall:async (req,res,nxt)=>{
        try {
            let halls=await Hall.findById({_id:req.params.id})
            halls.images.map((ele)=>{
                let fileName=ele.split('/')[3]
                fs.unlink(path.dirname(__dirname)+'/uploads/hall/' + fileName, (err) => {
                    if (err)throw err
                    console.log("Delete File successfully.");
                });
            })            
            nxt()
        } catch (error) {
            console.log(error.message);
            return  res.status(500).send(error.message)
        }
    },
    resort:async (req,res,nxt)=>{
        try {
            let resorts=await Resort.findById({_id:req.params.id})
            resorts.images.map((ele)=>{
                let fileName=ele.split('/')[3]
                fs.unlink(path.dirname(__dirname)+'/uploads/resort/' + fileName, (err) => {
                    if (err)throw err
                    console.log("Delete File successfully.");
                });
            })            
            nxt()
        } catch (error) {
            console.log(error.message);
            return  res.status(500).send(error.message)
        }
    },
    user:async (req,res,nxt)=>{
        try {
            if(!req.files) return nxt()
            let user=await User.findById({_id:req.user._id})
                let fileName=user.image.split('/')[3]
                fs.unlink(path.dirname(__dirname)+'/uploads/user/' + fileName, (err) => {
                    if (err) {
                        console.log(err.message);
                    }
                });
            nxt()
        } catch (error) {
            console.log(error.message);
            return  res.status(500).send(error.message)
        }
    },
}
module.exports=deleteFile