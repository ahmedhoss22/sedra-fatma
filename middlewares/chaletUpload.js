const path = require('path');

const chaletFileUpload = (req, res, next) => {
  try {
      let file=req.files['file[]']
      if(file.length==0) return res.status(403).send({error:"No files sent"})
      if (!Array.isArray(file)) file = [file];
      let fileNames= file.map((ele,ind)=>{ 
      let fileName=ind+"chalet"+Date.now()+path.extname(ele.name)
      let uploadpath=path.join(path.dirname(__dirname) +`/uploads/chalet/${fileName}`)
      ele.mv(uploadpath,(err)=>{
        if(err) return console.log(err.message)})
        return `/chalet/img/${fileName}`
      })
      req.imgNames=fileNames
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({error:error.message})
  }
};

module.exports = chaletFileUpload;