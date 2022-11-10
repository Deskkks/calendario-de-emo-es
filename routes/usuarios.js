const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
require('../models/usuarios')
const Usuario = mongoose.model('usuarios')
const bcrypt = require('bcrypt')
const passport = require('passport')
const {body} = require('express-validator')
const { validationResult } = require('express-validator');

router.get('/registro', (req, res) => {
  res.render('../views/usuarios/registro')
})

router.post('/registro',[
  body('email').isEmail().withMessage("O e-mail precisa ser válido"),
  body('email').custom(value => {
    if (!value) {
      return Promise.reject('E-mail é obrigatório');
    }
    if (value == "teste@teste.com") {
      return Promise.reject('E-mail já cadastrado');
    }
    return true
  }),
  body('email'). custom(async email => {
    Usuario.find({email: email}).then(user => {
      if (user) {
        return Promise.reject('E-mail já cadastrado');
      }
    }).catch(() =>{

    });
  }),
  body('nome').isLength({ min: 2 }).withMessage("Campo precisa ter pelo menos 2 caracteres"),
  body('senha').isLength({ min: 8 }).withMessage("Campo senha precisa ter pelo menos 8 caracteres"),
], (req, res) => {
  const errors = validationResult (req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
        res.redirect('/registro')
      })
    })
  })
})

router.get('/login', (req, res) => {
  res.render('../views/usuarios/login')
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })(req, res, next)
})

router.get('/logout', (req, res) => {
  req.logOut((err) => {
    
  })
  res.redirect('/')
})

module.exports = router