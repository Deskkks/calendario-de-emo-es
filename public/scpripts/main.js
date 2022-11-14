const mesBr = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const spans = document.querySelectorAll('.checkmark')

let display = {}
var primeiroDia
var agora = new Date()
var mes = agora.getMonth()
var ano = agora.getFullYear()
var hoje = agora.getDate()
var mesA = agora.getMonth()
var anoA = agora.getFullYear()

const cores = {
  perfeito: 'rgb(255, 0, 153)',
  incrivel: 'rgb(0, 98, 255)',
  bom: 'rgb(85, 255, 0)',
  neutro: 'rgb(225, 255, 0)',
  ruim: 'rgb(255, 136, 0)',
  pessimo: 'rgb(139, 0, 0)',
  podre: 'rgb(0, 0, 0)'
}

var divSelecionada

var dias = document.querySelector('#dias')
var contDias = document.querySelector('div#contCalendario')
var contCalen = document.querySelector('div#calendario')
var contano = document.querySelector('div#displayAno')
var contmes = document.querySelector('div#displayMes')
const divsDia = dias.querySelectorAll('div')
var botao_ante = document.querySelector('#btn_prev')
var botao_prox = document.querySelector('#btn_prox')
var btn_mes = document.querySelector('span#mes')
var btn_ano = document.querySelector('span#ano')
var btn_menu = document.querySelector('div#btn-calen')
const divsMes = contmes.querySelectorAll('div')
const divsAno = contano.querySelectorAll('div')
const inputData = document.querySelector('input#data')
const textArea = document.querySelector('textarea')

console.log(divsDia);

const disCalendario = {
  colocar(mes, ano) {
    funCor.mudarCorBD()

    btn_mes.innerHTML = mesBr[mes]
    btn_ano.innerHTML = ano

    let ultimoDia = new Date(ano, mes + 1, 0).getDate()
    primeiroDia = new Date(ano, mes, 1).getDay() -1

    for(i = -primeiroDia, index = 0; i < (42-primeiroDia); i++, index++){
      let dt = new Date(ano, mes, i)
      var diaCalendario = divsDia[index]
      diaCalendario.classList.remove('outroMes')
      diaCalendario.innerHTML = dt.getDate()

      if(i < 1){
        diaCalendario.classList.add('outroMes')
      }
      if(i > ultimoDia){
        diaCalendario.classList.add('outroMes')
      }
      if(dt.getDate() == hoje && mes == mesA && diaCalendario.classList != 'outroMes'){
        diaCalendario.classList.add('selecionado')
        inputData.value = new Date(ano, mes, diaCalendario.textContent)
        diaCalendario.innerHTML += '<i></i>'
        divSelecionada = diaCalendario
      }
    }
  },
  clickProx(){
    mes++
    if(mes > 11){
      mes = 0
      ano++
    }
    display.colocar(mes, ano)
  },
  clickAnte(){
    mes--
    if(mes < 0){
      mes = 11
      ano--
    }
    display.colocar(mes, ano)
  },
  clickMes() {
    contDias.style.display = 'none'
    contmes.style.display = 'grid'
    btn_mes.innerHTML = 'Meses'
    mudarTela(disMes)
    display.colocar()
  },
  clickAno() {
    contDias.style.display = 'none'
    contano.style.display = 'grid'
    btn_ano.innerHTML = 'Anos'
    btn_mes.innerHTML = ''
    mudarTela(disAno)
    display.colocar()
  }
}

const disMes = {
  colocar() {
    for(i = 0; i < 12; i++){
      divsMes[i].innerHTML = mesBr[i]
    }
  },
  clickProx(){
    ano++
    btn_ano.innerHTML = ano
  },
  clickAnte(){
    ano--
    btn_ano.innerHTML = ano
  },
  clickMes(){
    contDias.style.display = 'block'
    contmes.style.display = 'none'
    btn_ano.innerHTML = ano
    btn_mes.innerHTML = mesBr[mes]
    mudarTela(disCalendario)
    display.colocar(mes, ano) 
  },
}

const disAno = {
  colocar() {
    anoD = ano
    for(i = 0; i < 12; i++){
      divsAno[i].innerHTML = anoD
      anoD++
    }
  },
  clickProx(){
    for(i = 0; i < 12; i++){
      divsAno[i].innerHTML = anoD
      anoD++
    }
  },
  clickAnte(){
    anoD -= 24
    for(i = 0; i < 12; i++){
      divsAno[i].innerHTML = anoD
      anoD++
    }
  },
  clickAno(){
    contDias.style.display = 'block'
    contano.style.display = 'none'
    btn_ano.innerHTML = ano
    btn_mes.innerHTML = mesBr[mes]
    mudarTela(disCalendario)
    display.colocar(mes, ano)
  }
}

function mudarTela(novaTela){
  display = novaTela
}

const funCor = {
  mudarCorSelecionada(cor){
    primeiroDia = new Date(anoA, mesA, 1).getDay() -1
  
    if(mes != mesA || ano != anoA || cor == undefined){
      divSelecionada.style.backgroundColor = 'white'
      divSelecionada.style.color = 'black'
      divSelecionada.style.opacity = '1'
    }else{
      var color = window.getComputedStyle(cor)
      if(cor.style.opacity == '0.5') {
      divSelecionada.style.backgroundColor = 'white'
      divSelecionada.style.color = 'black'
      } else {
        divSelecionada.style.backgroundColor = color.backgroundColor
        divSelecionada.style.opacity = '0.7'
          if (
            divSelecionada.style.backgroundColor == 'rgb(85, 255, 0)' ||
            divSelecionada.style.backgroundColor == 'rgb(225, 255, 0)' ||
            divSelecionada.style.backgroundColor == 'rgb(255, 136, 0)'
          ) {
            divSelecionada.style.color = 'black'
          }else {
            divSelecionada.style.color = 'white'
          }
      }
    }
  },
  spanClick(cor) {
    if(cor.style.opacity == '1'){
      cor.style.opacity = '0.5'
    } else{
      spans.forEach(cor => cor.style.opacity = '0.5')
      cor.style.opacity = '1'
    }
  },
  spanEnter(cor) {

    if(cor.style.opacity == '0.5'){
      cor.style.opacity = '0.7'
    }
  },
  spanOut(cor) {
    if(cor.style.opacity === '0.7'){
      cor.style.opacity = '0.5'
    }
  },
  async mudarCorBD() {
    const data = await pegarApi()
    for (i = 0; i < data.length; i++) {
      var data1 = new Date(data[i].data).getDate()
      var mes1 = new Date(data[i].data).getMonth()
      for(index = 0; index < divsDia.length; index++) {
        if(divsDia[index].textContent == data1 && divsDia[index].classList != 'outroMes' && btn_mes.textContent == mesBr[mes1]){
          divsDia[index].style.backgroundColor = cores[data[i].classe]
          divsDia[index].style.opacity = '0.7'
        }else if(btn_mes.textContent != mesBr[mes1]) {
          divsDia[index].style.backgroundColor = 'white'
          divsDia[index].style.opacity = '1'
        }
      }
    }
  }
}

spans.forEach(cor => cor.style.opacity = '0.5')

spans.forEach(cor => cor.addEventListener ('click', () => { 
  funCor.spanClick(cor)
  funCor.mudarCorSelecionada(cor)
}))

spans.forEach(cor => cor.addEventListener('mouseenter', () => {

  funCor.spanEnter(cor)
}))

spans.forEach(cor => cor.addEventListener('mouseout', () => {

  funCor.spanOut(cor)
}))

divsDia.forEach(Ddia => Ddia.addEventListener('click', async () => {
  const data = await pegarApi()
  display.colocar(mes, ano)
  textArea.innerHTML = ''
  if(Ddia.classList != 'outroMes' && Ddia.textContent != hoje){
    divsDia.forEach(Ddia => {
      if(Ddia.classList == 'selecionado') {
        Ddia.classList.remove('selecionado')
      }
    })
    Ddia.classList.add('selecionado')
    inputData.value = new Date(ano, mes, Ddia.textContent)
    Ddia.innerHTML += '<i></i>'
    divSelecionada = Ddia
    for(i = 0; i < data.length; i++) {
      if(new Date(data[i].data) == inputData.value) {
        textArea.innerHTML = data[i].descricao
      }
    }
  }
}))

divsMes.forEach(Dmes => Dmes.addEventListener('click', () => {
  mes = mesBr.indexOf(Dmes.textContent)
  display.clickMes()
}))

divsAno.forEach(Dano => Dano.addEventListener('click', () => {
  ano = Number(Dano.textContent)
  display.clickAno()
  display.clickMes()
}))

botao_prox.addEventListener('click', () => {
  display.clickProx()
})

botao_ante.addEventListener('click', () => {
  display.clickAnte()
})

btn_mes.addEventListener('click', () => {
  if(display.clickMes){
    display.clickMes()
  }
}) 

btn_ano.addEventListener('click', () => {
  if(display.clickAno){
    display.clickAno()
  }
})

btn_menu.addEventListener('click', mudarDisplayCalendario)

function mudarDisplayCalendario() {
  var display = window.getComputedStyle(contCalen)
  if(display.display == 'block'){
    contCalen.style.display = 'none'
  }else {
    contCalen.style.display = 'block'
  }
}

let anoD

mudarTela(disCalendario)

display.colocar(mes, ano)

async function pegarApi(){
  const response = (await fetch('https://tranquil-lowlands-72809.herokuapp.com/calendario'))
  const data = await response.json()

  return data
}