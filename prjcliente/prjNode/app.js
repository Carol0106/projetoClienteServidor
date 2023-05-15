//CONEXÃO COM O BANCO DE DADOS
require('dotenv').config();

const mongoose = require('mongoose');
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${USER}:${PASS}@banconode.lxatbbd.mongodb.net/?retryWrites=true&w=majority`);
// Confirma ligação no console
mongoose.connection.on('connected', function () {
  console.log('Connected to Database '+'bancoNode');
});
// Mensagem de Erro
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});
//FIM

const express = require('express');
// inicializar app express
const app = express();

const bodyParser = require('body-parser');

app.set('view engine', 'js');
// app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('welcome');
});

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/api');
app.use('/api', routes);

//TRATAMENTO DE ERRO MIDDLEWARE
app.use(function(err, req, res, next){
  console.log(err);
  res.status(422).send({error: err.message});
});
//FIM

let port = 5002;
// servidor na porta 5002
app.listen(process.env.port || port, () =>{
  console.log('Servidor em execução na porta: '+ port);
});