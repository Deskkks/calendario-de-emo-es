const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    required: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true
  }
})

mongoose.model('classificacao', Classificacao)