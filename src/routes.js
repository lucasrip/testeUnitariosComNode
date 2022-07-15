const {Router} = require('express');
const multer  = require('multer');
const router =Router();

const multerConfig = require('./config/multer');

const UserController = require('./app/controllers/UserController');

router.post('/cadastrarUser',multer(multerConfig).single('fotoPerfill'),UserController.cadastrarUser)

module.exports= router;