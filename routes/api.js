const express = require("express");
const router = express.Router()
const mongoose = require('mongoose')
require('../models/classificacao')
const Classificacao = mongoose.model('classificacao')

router.get('/classificacao', (req, res) => {
  Classificacao.find()
  .then((categoria) => {
      res.json(categoria)
  })
})

module.exports = router