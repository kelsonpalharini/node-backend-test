const express  = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

//controle de acesso
app.use(cors());

//alteração para api aceita se comunicar tanto com http quanto websocket
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
   socket.on('connectRoom', box =>{
       socket.join(box);  
   });
});

//módulo usado para abstrair o banco de dados 
mongoose.connect('mongodb+srv://kelsonpalharini:Root10@DevFull@cluster0-0qfk4.azure.mongodb.net/omnistack?retryWrites=true', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true})); //permite que enviemos arquivos nas requisições
//toda vez que receber uma requisição de arquivos na rota /files direcionamos para a pasta temp
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

//Definindo arquivo de rotas
app.use(require('./routes.js'));

//alteração para api se comunicar tanto com http quanto websocket
//app.listen(3333);
server.listen(3333);