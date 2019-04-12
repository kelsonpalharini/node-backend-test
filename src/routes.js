const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/BoxControllers');
const FileController = require('./controllers/FileController');

/*
  MÉTODOS PRINCIPAIS DE UMA API REST: GET/POST/PUT/DELETE
    - GET.: SEMPRE QUE FOR BUSCAR ALGUMA INFORMAÇÃO NO BACKEND;
    - POST: CRIAR ALGUMA INFORMAÇÃO;
    - PUT.: EDITAR ALGUMA INFORMAÇÃO;
    - DELETE: APAGAR ALGUMA INFORMAÇÃO
*/

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);

routes.post(
  "/boxes/:id/files", 
  multer(multerConfig).single('file'), 
  FileController.store
);

routes.get('/teste', (req, res) => {
    return res.send('Hello World!');
});

module.exports = routes;
