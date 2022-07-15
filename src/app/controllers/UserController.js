const { v4 } = require('uuid');
const yup = require('yup');
const path = require('path');
const fs = require('fs');



const validacaoCadastrarUser = require('../validacao/validacaoCadastrarUser');

class UserController
{

  async cadastrarUser(req,res)
  {
     const {body,file} = req;
     const schemaValidado = validacaoCadastrarUser.shemaValidacao(yup,body.genero);

    try
    {
       await schemaValidado.validate(body);

       const data = validacaoCadastrarUser.montaData(body,v4,file)
       
       if(file)
       {
          fs.unlink((path.resolve(__dirname,'..','..','uploads',file?.filename)),  (err)=>{
         if (err) throw err;
         console.log('Arquivo deletado!');
         })
       }
       
      return res.json(data)
    }
    catch(err)
    {
      return res.status(400).json({
        erro:true,
        mensagem:err.errors
      })
    }
  }

}

module.exports = new UserController;



