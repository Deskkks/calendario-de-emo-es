const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
require('../models/usuarios')
const Usuario = mongoose.model('usuarios')
const bcrypt = require('bcrypt')
const passport = require('passport')

router.get('/registro', (req, res) => {
  res.render('registro')
})

router.post('/registro', (req, res) => {
  const novoUser = new Usuario ({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha
  })

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(novoUser.senha, salt, (erro, hash) => {


      novoUser.senha = hash

      novoUser.save()
      .then(() => {
        res.redirect('/')
      })
      .catch((err) => {
        console.log('erro: ' + err);
        res.redirect('/')
      })
    })
  })
})

router.get('/login', (req, res) => {
  res.render('../views/login')
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })(req, res, next)
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router