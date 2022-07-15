const request = require('supertest');
const router = require('../../routes');

const path = require('path');

const userData = {
  nome: "lucas",
  dataNasc: "2022-07-13",
  genero: "Masculino",
  complemento: "808",
  descGenero:'',
  email: "lucas@gmail.com",
  tell: "998714545",
  rua: "rua joao ramalho",
  numero: "301",
  bairro: "reunio",
  cidade: "goiais",
  estado: "sp",
}

it('testa se o campo nome é texto',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({nome:12312,...userData})
         expect(400)
})

it('testa se o campo nome é obrigatorio',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({nome:null,...userData})
         expect(400)
})

it('testa se o campo data é do tipo data',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({dataNasc:"",...userData})
         expect(400)
})

it('testa se o campo data não aceita data futura',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({dataNasc: new Date("2022-07-16"),...userData})
         expect(400)
})

it('testa se o campo genero é obrigatorio',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({genero:null,...userData})
         expect(400)
})

it('testa se o campo genero esta aceitando apenas as escolhas predefinidas',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({genero:"lucas",...userData})
         expect(400)
})

it('testa se o campo descGenero é um texto',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({genero:'Outro',descGenero:2323432,...userData})
         expect(400)
})

it('testa se o campo descGenero é obrigatorio',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({genero:'Outro',descGenero:null,...userData})
         expect(400)
})

it('testa se o campo descGenero é não obrigatorio se o genero for diferente de outro',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({genero:'Masculino',descGenero:null,...userData})
         expect(200)
})

it('testa se o campo email é obrigatorio',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({email:null,...userData})
         expect(400)
})

it('testa se o campo email aceita email invalido',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({email:"fsdfsdfsdfsd",...userData})
         expect(400)
})

it('testa se o campo tell é obrigatorio',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({tell:null,...userData})
         expect(400)
})

it('testa se o campo tell so recebe numeros',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({tell:"sfsdfsd",...userData})
         expect(400)
})

it('testa se o campo tell esta recebendo no minimo 9 numeros',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({tell:123456789,...userData})
         expect(200)
})

it('testa se o campo tell esta recebendo no maximo 11 numeros',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({tell:12345678911,...userData})
         expect(400)
})

it('testa se o campo tell esta recebendo menos que 9 numeros',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({tell:12345678,...userData})
         expect(400)
})

it('testa se o campo tell esta recebendo mais que 11 numeros',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({tell:123456789111,...userData})
         expect(400)
})

it('testa se o campo rua é obrigatorio',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({rua:null,...userData})
         expect(400)
})

it('testa se o campo rua recebe apenas numeros',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({rua:"dfsdfsd",...userData})
         expect(400)
})

it('testa se o campo numero é obrigatorio',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({numero:null,...userData})
         expect(400)
})

it('testa se o campo numero recebe apenas numeros',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({numero:"sdfsd",...userData})
         expect(400)
})

it('testa se o campo bairro é obrigatorio',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({bairro:null,...userData})
         expect(400)
})

it('testa se o campo bairro não recebe numero',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({bairro:3423,...userData})
         expect(400)
})

it('testa se o campo cidade é obrigatorio',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({cidade:null,...userData})
         expect(400)
})

it('testa se o campo cidade não recebe numeros',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({cidade:53454,...userData})
         expect(400)
})

it('testa se o campo estado é obrigatorio',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({estado:null,...userData})
         expect(400)
})

it('testa se o campo estado recebe no minimo 2 caracteres',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({estado:'2',...userData})
         expect(400)
})

it('testa se o campo estado recebe no maximo 2 caracteres',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({estado:'123',...userData})
         expect(400)
})

it('testa se o campo estado recebe exatamente 2 caracteres',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({estado:'12',...userData})
         expect(400)
})

it('testa se o campo complemento não recebe  numeros',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({complemento:53454,...userData})
   expect(400)
})

it('testa request apenas sem foto selecionado',()=>{
  request(router)
  .post('/cadastrarUser')
  .send({...userData})
  expect(200)
})

it('testa se campo foto não permite texto',()=>{
   request(router)
  .post('/cadastrarUser')
  .send({fotoPerfill:'texto',...userData})
         expect(400)
})

it('testa se campo foto não permite numero',()=>{
  request(router)
 .post('/cadastrarUser')
 .send({fotoPerfill:234,...userData})
        expect(400)
})

it('testa se campo foto não permite jpg',()=>{
  const image = path.resolve(__dirname,'..','..','uploads',`eu.jpg`)

   request(router)
  .post('/cadastrarUser')
  .set('content-type', 'multipart/form-data')
  .attach('fotoPerfill', image)
  .expect(400)
    
})

it('testa se campo foto não arquivos maiores que 2mb',()=>{
  const image = path.resolve(__dirname,'..','..','uploads','tirgerTamanhoMaiorQueOpermitido.png')

   request(router)
  .post('/cadastrarUser')
  .set('content-type', 'multipart/form-data')
  .attach('fotoPerfill', image)
  .expect(400)
    
})

it('testa request com apenas foto selecionado',()=>{
  const image = path.resolve(__dirname,'..','..','uploads',`eu.png`)

   request(router)
  .post('/cadastrarUser')
  .set('content-type', 'multipart/form-data')
  .attach('fotoPerfill', image)
  .expect(400)
    
})

