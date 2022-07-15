const multer = require('multer');
const path = require('path');
const crypto =require('crypto');

module.exports = {
  dest:path.resolve(__dirname,'..','uploads'),
  storage:multer.diskStorage({
    destination:(req, file, cb)=>{
      cb(null , path.resolve(__dirname,'..','uploads'))
    },
    filename:(req, file, cb)=>{
      crypto.randomBytes(16,(err,hash)=>{
        if(err) cb(err);
        const fileName = `${hash.toString('hex')}-${file.originalname}`
        cb(null,fileName);
      })
    },
  }),
  limits:{
    fileSize:()=>{
     const mb = 2 * 1024 * 1024;
     return mb ;

    } ,
  },
  fileFilter:(req,file,cb)=>{
  
    const formatosPermitidos = ['image/png'];

    if(formatosPermitidos.includes(file.mimetype))cb(null,true);
    else
    {
       cb("o arquivo deve ter 2mb de tamanho de memoria ou menos e ser png")
    }
  }
  
}