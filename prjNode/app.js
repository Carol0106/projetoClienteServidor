//CONEXÃO COM O BANCO DE DADOS
require('dotenv').config();

const mongoose = require('mongoose');
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASS;

mongoose.connect('mongodb://127.0.0.1:27017/prjClienteServidor', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexão com o MongoDB realizada com sucesso!');
}).catch((err) => {
  console.error('Erro ao conectar com o MongoDB: ' + err);
});

// mongoose.connect(`mongodb+srv://${USER}:${PASS}@banconode.lxatbbd.mongodb.net/?retryWrites=true&w=majority`);
// // Confirma ligação no console
// mongoose.connection.on('connected', function () {
//   console.log('Connected to Database '+'bancoNode');
// });
// // Mensagem de Erro
// mongoose.connection.on('error', (err) => {
//   console.log('Database error '+err);
// });
//FIM

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// inicializar app express
const app = express();

// Habilita o CORS
app.use(cors());


app.set('view engine', 'ejs');
// app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
  // res.render('welcome');
  res.json({ mensagem: 'Olá, mundo!' });
});

//configurando o body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/api');
app.use('', routes);

//TRATAMENTO DE ERRO MIDDLEWARE
app.use(function(err, req, res, next){
  console.log(err);
  res.status(422).send({error: err.message});
});
//FIM

// Variável global para armazenar os tokens inválidos
global.blacklist = [];


app.listen(process.env.port, () =>{
  console.log('Servidor em execução na porta: '+ process.env.port);
});
