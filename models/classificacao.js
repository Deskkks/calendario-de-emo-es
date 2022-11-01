const mongoose = require('mongoose')
const Schema = mongoose.Schema
var agora = new Date

const Classificacao = new Schema({
  classe: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    default: agora
  }
})

mongoose.model('classificacao', Classificacao)