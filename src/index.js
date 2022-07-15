const express = require('express');
const routes = require('./routes');
const app = express();

const swaggerUI = require('swagger-ui-express');

const documentacao = require('././app/documentacao/swagger.json');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(routes);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(documentacao))

app.listen(8080);


