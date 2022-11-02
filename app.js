const express = require('express')
const hbs = require('express-handlebars')
const app = express()
const path = require('path')
const api = require('./routes/api')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('./models/classificacao')
const Classificacao = mongoose.model('classificacao')

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
mongoose.connect('mongodb://localhost/calendario')
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
  res.render('calendario')
})

app.post('/save', (req, res) => {
  const novaClasse = {
    classe: req.body.dia,
    descricao: req.body.descricao
  }
  
  new Classificacao(novaClasse).save()
  .then(() => {
    res.redirect('/')
  })
  .catch((err) => {
    console.log('erro: ' + err);
    res.redirect('/')
  })
})

app.use('/api', api)

//outros

const port = 8081
app.listen(port, () => {
  console.log('servidor rodando');
})