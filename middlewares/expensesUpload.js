const path = require('path');

const chaletFileUpload = (req, res, next) => {
  try {
      if(! req.files) return next () 
      let file=req.files['file']
      if(file.length==0) return next()
      let fileName='expenses'+Date.now()+path.extname(file.name)
      let uploadpath=path.join(path.dirname(__dirname) +`/uploads/expenses/${fileName}`)
      file.mv(uploadpath,(err)=>{
        if(err) return console.log(err.message)
      })
      req.img=`/expenses/img/${fileName}`
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({error:error.message})
  }
};

module.exports = chaletFileUpload;
