const express = require('express')
const app = express()
const session = require('express-session')
const hbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
require('./config/auth')(passport)
require('./models/classificacao')
const Classificacao = mongoose.model('classificacao')
require('./models/usuarios')
const api = require('./routes/api')
const usuario = require('./routes/usuarios')
const {logado} = require('./helpers/logado')

//sessão

app.use(session({
  secret: 'test',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.user = req.user || null
  next()
})

//body parser

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//handlebars

app.engine('handlebars', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}))
app.set('view engine', 'handlebars')

//mogoose

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://dev:MrhEmPWnD1a6YwW5@atlascluster.pkd6hnq.mongodb.net/test')
.then(() => {
  console.log('canectado ao mongo')
})
.catch((err) => {
  console.log('ocorreu um problema: ' + err)
})

//public

app.use(express.static(path.join(__dirname,'public')))

//rotas

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/save', logado , (req, res) => {
  const novaClasse = {
    classe: req.body.dia,
    descricao: req.body.descricao,
    data: req.body.data,
    usuario: req.user
  }
  
  Classificacao.findOneAndUpdate({data: novaClasse.data, usuario: novaClasse.usuario}, novaClasse)
  .catch(
    new Classificacao(novaClasse).save()
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      console.log('erro: ' + err);
      res.redirect('/')
    })
  )
})

app.get('/sobre', (req, res) => {
  res.render('sobremim')
})

app.get('/calendario', (req, res) => {
  res.render('calendario')
})

app.use('/api', api)
app.use('', usuario)

//outros

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
  console.log('servidor rodando');
})