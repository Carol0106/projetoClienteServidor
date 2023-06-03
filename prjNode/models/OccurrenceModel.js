const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./UserModel');

const OccurrencesArray = [
    {
        "id": 1,
        "descricao": "Atropelamento"
    },
    {
        "id": 2,
        "descricao": "Deslizamento"
    },
    {
        "id": 3,
        "descricao": "Colisão frontal"
    },
    {
        "id": 4,
        "descricao": "Capotagem"
    },
    {
        "id": 5,
        "descricao": "Saída de pista"
    },
    {
        "id": 6,
        "descricao": "Batida em objeto fixo"
    },
    {
        "id": 7,
        "descricao": "Veículo avariado"
    },
    {
        "id": 8,
        "descricao": "Colisão com motocicletas"
    },
    {
        "id": 9,
        "descricao": "Colisão no mesmo sentido ou transversal"
    },
    {
        "id": 10,
        "descricao": "Construção"
    },
];



const Occurrence =  new Schema({
    registered_at:{
        type: String,
        default: Date.now,
        required: [true,'*Campo obrigatório!']
    },
    local:{
        type: String,
        required: [true,'*Campo obrigatório!'],
        maxlength:125,
        minlength:10
    },
    occurrence_type:{ 
        type:Number,
        required: [true,'*Campo obrigatório!'],
        validate: {
            validator: function(v) {
                return Number.isInteger(v);
            },
            message: '{VALUE} não é um número inteiro!'
        },
        maxlength:2,
        minlength:1
    },
    km:{ 
        type:Number,
        required: [true,'*Campo obrigatório!'],
        validate: {
            validator: function(v) {
                return Number.isInteger(v);
            },
            message: '{VALUE} não é um número inteiro!'
        },
        maxlength:125,
        minlength:1
    },
    user_id:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true,'*Campo obrigatório!'],
        minlength:1
    },
    token:{ 
        type:String,
        required: [true,'*Campo obrigatório!']
    },
});


//funcao para buscar id p exibir o objeto do array
// function getOccurrenceTypeById(id) {
//     const occurrenceType = OccurrencesArray.find(o => o.id === id);
//     return occurrenceType ? occurrenceType.descricao : null;
//   }
  
//   register(new Date(), 1); // Salva uma ocorrência do tipo "Atropelamento"
//   console.log(getOccurrenceTypeById(1)); // Imprime "Atropelamento"

const Occurrences = mongoose.model('Occurrence', Occurrence);
module.exports = Occurrences;