
const campoTexto = (campo) => `o ${campo} deve ser um texto`;
const campoRequired = (campo) => `o campo ${campo} deve ser preenchido...`;
const opçõesGenero = [ 'Masculino', 'Feminino', 'Outro', 'Prefiro não dizer']

class validacaoCadastrarUser 
{
  shemaValidacao(yup,genero)
  {
    const{string,date,number} = yup;

      return yup.object().shape(
        {
        nome:string(campoTexto('nome')).required(campoRequired('nome')),
        dataNasc:date('o campo dataNasc deve ser do tipo Date')
          .max(new Date(),'a data deve ser do dia atual ou anterior').required(campoRequired('dataNasc')),
        genero:string(campoTexto('genero')).oneOf(opçõesGenero,`escolha apenas uma das opcoes ${opçõesGenero}`).required(campoRequired('genero')),
        descGenero:string(campoTexto('descGenero')).test('verifica se genero foi selecionado',campoRequired('descGenero'),
        ()=> genero === 'Outro'?false:true),
        email:string(campoTexto('email'))
          .email('o campo email deve ser um email valido')
          .required(campoRequired('email')),
        tell:number('o campo tell deve ter apenas numeros')
          .integer("o campo tell deve ser preenchido  apenas com numeros")
          .test('lenght', 'o campo tell deve ter no minimo 9 caracteres ou no maximo 11', 
          value =>{
            const tellLegth = String(value).length;
          return tellLegth < 9 || tellLegth > 11?false:true;
          })
          .required(campoRequired('tell')),
        rua:string(campoTexto('rua'))
          .required(campoRequired('rua')),
        numero:number('o campo numero deve ter apenas numeros')
          .required(campoRequired('numero')),
        bairro:string(campoTexto('bairro'))
          .required(campoRequired('bairro')),
        cidade:string(campoTexto('cidade'))
          .required(campoRequired('cidade')),
        estado:string(campoTexto('estado'))
          .min(2).max(2)
          .required(campoRequired('estado')),
        complemento:string(campoTexto('complemento')),
        })

  }

  montaData(body,v4,file)
  {
    const {
      nome,
      dataNasc,
      genero,
      email,
      descGenero,
      tell,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      complemento
     }
     =body
    const fotoPerfill = this.validaFile(file);

    return {
      id:v4(),
      userInfo:{
          nome,
          dataNasc,  
          genero,
          descGenero,
          complemento,
       },
       userContato:{
          email,
          tell,
       },
       userLocalizacao:
       {
        rua,
        numero,
        bairro,
        cidade,
        estado,
       },
      imagens:{
        fotoPerfill
      }
     };
  }

  validaFile(file)
  {
    const mb = 2 * 1024 * 1024;
  
    if(file)  return file
    if(file === undefined) return null
    if(file.size > mb || file.mimetype != 'image/png') 
    {
       return " o arquivo deve ter 2mb de tamanho de memoria ou menos e ser png";
    }
  }
 
}

module.exports = new validacaoCadastrarUser ;